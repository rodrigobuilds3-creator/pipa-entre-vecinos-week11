export const UNITS = ['A', 'B', 'C', 'D'];
export const QUOTES = [
  { id: 'q1', name: 'Proveedor demo 01', liters: 10000, cents: 180000, window: 'Mañana · 09:00–12:00' },
  { id: 'q2', name: 'Proveedor demo 02', liters: 8000, cents: 152000, window: 'Mañana · 12:00–16:00' },
  { id: 'q3', name: 'Proveedor demo 03', liters: 10000, cents: 195000, window: 'Pasado mañana · 08:00–11:00' },
];
export const money = cents => new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(cents / 100);
function insist(ok, message) { if (!ok) throw new Error(message); }
export function number(value, min, max, label) {
  insist(value !== '' && value !== null && typeof value !== 'boolean', `${label}: falta un valor.`);
  const n = Number(value); insist(Number.isFinite(n) && n >= min && n <= max, `${label}: usa un valor entre ${min} y ${max}.`); return n;
}
export function toCents(value) {
  insist(/^\d{1,7}(\.\d{1,2})?$/.test(String(value)), 'Monto: usa pesos positivos con máximo dos decimales.');
  const n = Math.round(Number(value) * 100); insist(n > 0 && n <= 100000000, 'Monto fuera de rango.'); return n;
}
export function equalShares(total) {
  insist(Number.isInteger(total) && total > 0, 'Total inválido.');
  const base = Math.floor(total / UNITS.length), remainder = total % UNITS.length;
  return Object.fromEntries(UNITS.map((u,i) => [u, base + (i < remainder ? 1 : 0)]));
}
export function validateShares(shares, total) {
  insist(shares && Object.keys(shares).length === 4 && UNITS.every(u => Number.isInteger(shares[u]) && shares[u] >= 0), 'Revisa las cuatro aportaciones.');
  insist(UNITS.reduce((s,u) => s+shares[u], 0) === total, 'Las aportaciones deben sumar exactamente el total cotizado.'); return shares;
}
export function initialState() {
  return { version: 1, revision: 0, stage: 'draft', quoteId: 'q1', shares: equalShares(180000), payments: [], delivery: null, events: [], nextId: 1 };
}
export function quoteFor(state) { return QUOTES.find(q => q.id === state.quoteId); }
export function paid(state, unit) { return state.payments.filter(p => p.unit===unit && !p.voided).reduce((s,p) => s+p.cents,0); }
export function estimateDelivery(input) {
  const capacity = number(input.capacity,100,100000,'Capacidad');
  const before = number(input.before,0,100,'Nivel anterior');
  const after = number(input.after,0,100,'Nivel posterior');
  const withdrawals = number(input.withdrawals,0,100000,'Consumo durante llenado');
  insist(input.calibrated === true, 'Confirma una escala de nivel calibrada a volumen.');
  const liters = capacity * (after-before)/100 + withdrawals;
  insist(liters>0 && liters<=200000,'La entrega estimada debe ser positiva. Revisa niveles y consumo.');
  return {capacity,before,after,withdrawals,calibrated:true,liters:Math.round(liters)};
}
export function transition(state, action, data={}, at=new Date().toISOString()) {
  validateState(state); const next=structuredClone(state); let detail='';
  switch(action) {
    case 'quote': {
      insist(state.stage==='draft','Solo puedes cambiar la cotización antes de confirmar.');
      const q=QUOTES.find(q=>q.id===data.id); insist(q,'Cotización no válida.');
      next.quoteId=q.id; next.shares=equalShares(q.cents); detail=`Cotización seleccionada: ${q.name}.`; break;
    }
    case 'confirm':
      insist(state.stage==='draft','El pedido ya fue confirmado.'); validateShares(data.shares,quoteFor(state).cents);
      next.shares=structuredClone(data.shares); next.stage='confirmed'; detail='Reparto aprobado y pedido confirmado manualmente.'; break;
    case 'payment': {
      insist(['confirmed','review'].includes(state.stage),'Confirma el pedido antes de registrar aportaciones.');
      insist(UNITS.includes(data.unit),'Departamento no válido.'); insist(['cash','transfer'].includes(data.method),'Método no válido.');
      insist(Number.isInteger(data.cents)&&data.cents>0,'Monto no válido.');
      insist(paid(state,data.unit)+data.cents<=state.shares[data.unit],'El monto supera la aportación acordada.');
      next.payments.push({id:next.nextId++,unit:data.unit,cents:data.cents,method:data.method,at,voided:false});
      detail=`Aportación registrada para departamento ${data.unit}.`; break;
    }
    case 'voidPayment': {
      insist(['confirmed','review'].includes(state.stage),'El pedido debe estar abierto para corregir.');
      const p=next.payments.find(p=>p.id===data.id); insist(p&&!p.voided,'Aportación no encontrada o ya corregida.');
      p.voided=true; detail=`Aportación ${p.id} anulada; el registro original se conserva.`; break;
    }
    case 'delivery':
      insist(['confirmed','review'].includes(state.stage),'Confirma el pedido antes de recibir.');
      next.delivery={...estimateDelivery(data),at,reviewed:false}; next.stage='review'; detail='Lecturas de entrega registradas; revisión pendiente.'; break;
    case 'review':
      insist(state.stage==='review'&&state.delivery,'Registra primero las lecturas.');
      insist(data.accepted===true,'Debes revisar la diferencia antes de continuar.');
      next.delivery.reviewed=true; detail='Diferencia revisada por coordinación; no implica certificación de volumen.'; break;
    case 'close':
      insist(state.stage==='review'&&state.delivery?.reviewed,'Revisa la entrega antes de cerrar.');
      next.stage='closed'; detail='Cuenta cerrada manualmente. Los saldos no condicionan el acceso al agua.'; break;
    default: throw new Error('Acción desconocida.');
  }
  next.revision++; next.events.push({action,detail,at,id:next.nextId++}); validateState(next); return next;
}
export function validateState(s) {
  insist(s && s.version===1 && Number.isInteger(s.revision) && s.revision>=0 && Number.isInteger(s.nextId)&&s.nextId>0,'Formato de almacenamiento no válido.');
  insist(['draft','confirmed','review','closed'].includes(s.stage),'Estado de pedido no válido.');
  const q=quoteFor(s); insist(q,'Cotización guardada no válida.'); validateShares(s.shares,q.cents);
  insist(Array.isArray(s.payments)&&s.payments.length<=200 && Array.isArray(s.events)&&s.events.length<=500,'Historial fuera de rango.');
  insist(s.payments.every(p=>Number.isInteger(p.id)&&UNITS.includes(p.unit)&&Number.isInteger(p.cents)&&p.cents>0&&['cash','transfer'].includes(p.method)&&typeof p.voided==='boolean'&&typeof p.at==='string'),'Aportaciones guardadas no válidas.');
  insist(UNITS.every(u=>paid(s,u)<=s.shares[u]),'Aportaciones superiores al reparto.');
  insist(s.events.every(e=>typeof e.detail==='string'&&e.detail.length<240&&typeof e.at==='string'),'Historial guardado no válido.');
  if (s.delivery) { const d=estimateDelivery(s.delivery); insist(d.liters===s.delivery.liters && typeof s.delivery.reviewed==='boolean','Entrega guardada no válida.'); }
  if(['review','closed'].includes(s.stage)) insist(s.delivery,'Falta entrega registrada.');
  if(s.stage==='closed') insist(s.delivery.reviewed,'Cuenta cerrada sin revisión.');
  return s;
}
export function serializeSummary(state) {
  const q=quoteFor(state); const totalPaid=state.payments.filter(p=>!p.voided).reduce((sum,p)=>sum+p.cents,0);
  return `PIPA ENTRE VECINOS · DATOS FICTICIOS\n${q.name}\nTotal acordado: ${money(q.cents)} MXN\nVolumen cotizado: ${q.liters.toLocaleString('es-MX')} L\nVolumen estimado: ${state.delivery?state.delivery.liters.toLocaleString('es-MX')+' L (no certificado)':'pendiente'}\nAportaciones registradas, total: ${money(totalPaid)} MXN\nSaldo agregado: ${money(q.cents-totalPaid)} MXN\nEstado: ${{draft:'Borrador',confirmed:'Confirmado',review:'En revisión',closed:'Cerrado'}[state.stage]}\nEl reparto fue acordado por coordinación. No se incluyen saldos individuales ni lecturas crudas.\nEste resumen se comparte solo por decisión de quien lo exporta.`;
}
export function syntheticHistory() {
  return Array.from({length:28},(_,i)=>({day:i+1,liters:1200+9*i+((i*13)%17-8)*9}));
}
export function forecast(history=syntheticHistory(),reserve=6200) {
  insist(Array.isArray(history)&&history.length>=10,'Se necesitan al menos diez días de historial.');
  insist(history.every(r=>Number.isFinite(r.day)&&Number.isFinite(r.liters)&&r.liters>0),'Historial de consumo no válido.');
  const cut=Math.floor(history.length*.75),train=history.slice(0,cut),test=history.slice(cut);
  const meanX=train.reduce((s,r)=>s+r.day,0)/train.length,meanY=train.reduce((s,r)=>s+r.liters,0)/train.length;
  const variance=train.reduce((s,r)=>s+(r.day-meanX)**2,0); insist(variance>0,'Días de entrenamiento repetidos.');
  const slope=train.reduce((s,r)=>s+(r.day-meanX)*(r.liters-meanY),0)/variance,intercept=meanY-slope*meanX;
  const predict=x=>Math.max(1,intercept+slope*x);
  const mae=test.reduce((s,r)=>s+Math.abs(r.liters-predict(r.day)),0)/test.length;
  const baseline=test.reduce((s,r)=>s+Math.abs(r.liters-train.at(-1).liters),0)/test.length;
  const next=predict(history.at(-1).day+1),best=mae<baseline;
  const consumption=best?next:train.at(-1).liters;
  return {slope,intercept,mae,baseline,next,consumption,best,days:reserve/consumption,low:reserve/(consumption+mae),high:reserve/Math.max(1,consumption-mae),train:train.length,test:test.length};
}
