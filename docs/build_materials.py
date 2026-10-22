from pathlib import Path
from html import escape
import re, textwrap, json
from reportlab.platypus import SimpleDocTemplate,Paragraph,Spacer,Image,Table,TableStyle,Preformatted
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.colors import HexColor
from reportlab.pdfbase import pdfmetrics
from reportlab.pdfbase.ttfonts import TTFont
from pypdf import PdfReader
import pypdfium2 as pdfium
from PIL import Image as PILImage

ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'deliverables';OUT.mkdir(exist_ok=True)
QA=ROOT/'evidence/pdf-qa';QA.mkdir(parents=True,exist_ok=True)
for name,file in [('Arial','Arial.ttf'),('ArialBold','Arial Bold.ttf')]:
 pdfmetrics.registerFont(TTFont(name,'/System/Library/Fonts/Supplemental/'+file))
ink=HexColor('#183b34');teal=HexColor('#126557')
body=ParagraphStyle('body',fontName='Arial',fontSize=9.5,leading=13.3,textColor=ink,spaceAfter=7)
head=ParagraphStyle('head',fontName='ArialBold',fontSize=13,leading=16,textColor=teal,spaceBefore=13,spaceAfter=7,keepWithNext=True)
title=ParagraphStyle('title',fontName='ArialBold',fontSize=23,leading=27,textColor=ink,spaceAfter=13)
cell=ParagraphStyle('cell',parent=body,fontSize=8,leading=11,spaceAfter=0)
mono=ParagraphStyle('mono',fontName='Courier',fontSize=7.4,leading=10,textColor=ink,spaceAfter=8)
def inline(s):
 s=escape(s)
 s=re.sub(r'\*\*(.*?)\*\*',r'<b>\1</b>',s)
 s=re.sub(r'`([^`]+)`',r'<font name="Courier">\1</font>',s)
 return s
def footer(c,d):
 c.setStrokeColor(teal);c.line(42,756,570,756);c.setFont('Arial',7);c.setFillColor(ink)
 c.drawString(42,25,'PIPA ENTRE VECINOS / BUSINESS BENDING WEEK 11')
 c.drawRightString(570,25,str(d.page))
def build(name,target,extras=None):
 lines=(ROOT/'docs'/name).read_text().splitlines();story=[];i=0
 while i<len(lines):
  line=lines[i].strip()
  if not line:i+=1;continue
  if line.startswith('```'):
   language=line[3:];code=[];i+=1
   while i<len(lines) and not lines[i].startswith('```'):
    code+=textwrap.wrap(lines[i],93,replace_whitespace=False,drop_whitespace=False) or [''];i+=1
   story.append(Paragraph('Mermaid source' if language=='mermaid' else 'Code',head));story.append(Preformatted('\n'.join(code),mono));i+=1;continue
  if line.startswith('!['):
   path=ROOT/'docs'/line.split('](')[1].rstrip(')')
   if path.exists():
    im=PILImage.open(path);w=518;h=w*im.height/im.width
    story+=[Image(str(path),width=w,height=h),Spacer(1,10)]
   i+=1;continue
  if line.startswith('|'):
   rows=[]
   while i<len(lines) and lines[i].strip().startswith('|'):
    values=[v.strip() for v in lines[i].strip().strip('|').split('|')]
    if not all(re.fullmatch(r'[:\- ]+',v) for v in values):rows.append([Paragraph(inline(v),cell) for v in values])
    i+=1
   widths=[528/len(rows[0])]*len(rows[0]);tbl=Table(rows,colWidths=widths,repeatRows=1,hAlign='LEFT')
   tbl.setStyle(TableStyle([('BACKGROUND',(0,0),(-1,0),HexColor('#e7f0e6')),('VALIGN',(0,0),(-1,-1),'TOP'),('BOTTOMPADDING',(0,0),(-1,-1),8),('TOPPADDING',(0,0),(-1,-1),8),('LINEBELOW',(0,0),(-1,-1),.4,HexColor('#dce5d9'))]));story+=[tbl,Spacer(1,10)];continue
  if line.startswith('# '):story.append(Paragraph(inline(line[2:]),title));i+=1;continue
  if line.startswith('## '):story.append(Paragraph(inline(line[3:]),head));i+=1;continue
  if line.startswith('- '):line='• '+line[2:]
  story.append(Paragraph(inline(line),body));i+=1
 if extras:
  story.append(Paragraph('Visual evidence after correction',head))
  for name in extras:
   image=ROOT/'evidence/screenshots'/name;im=PILImage.open(image);h=min(570,518*im.height/im.width);w=h*im.width/im.height
   story+=[Image(str(image),width=w,height=h),Spacer(1,10)]
 pdf=OUT/target;SimpleDocTemplate(str(pdf),pagesize=(612,792),topMargin=45,bottomMargin=42,leftMargin=42,rightMargin=42,title=target.replace('_',' '),author='Rodrigo Peña de León Pérez').build(story,onFirstPage=footer,onLaterPages=footer)
 reader=PdfReader(pdf);assert len(reader.pages)>0
 doc=pdfium.PdfDocument(str(pdf));thumbs=[]
 for n in range(len(doc)):
  im=doc[n].render(scale=1.1).to_pil().convert('RGB');im.save(QA/f'{pdf.stem}-{n+1}.png');im.thumbnail((400,530));thumbs.append(im)
 sheet=PILImage.new('RGB',(820,((len(thumbs)+1)//2)*550),'#dfe8e0')
 for n,im in enumerate(thumbs):sheet.paste(im,(10+n%2*410,10+n//2*550))
 sheet.save(QA/f'{pdf.stem}-contact.png')
 return {'file':str(pdf),'pages':len(reader.pages)}
result=[build('PACKET.md','PACKET_Rodrigo_Pena_WEEK11.pdf'),build('PERSONA_TEST.md','PERSONA_Rodrigo_Pena_WEEK11.pdf')]
print(json.dumps(result,indent=2))
