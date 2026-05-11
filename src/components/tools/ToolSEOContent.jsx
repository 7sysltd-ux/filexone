import { useState, useEffect } from 'react';
import { CheckCircle, ChevronDown } from 'lucide-react';
import { useI18n } from '@/lib/i18n';

const TOOL_DATA = {
  compress: {
    en: {
      howTitle: 'How to Compress a PDF',
      steps: [
        { title: 'Upload your PDF(s)', desc: 'Drag and drop one or multiple PDF files to compress.' },
        { title: 'Choose compression level', desc: 'Pick recommended (best balance) or extreme (smallest size).' },
        { title: 'Download compressed PDFs', desc: 'Click compress and download your smaller PDFs or ZIP archive.' },
      ],
      faqs: [
        { q: 'Is PDF compression free?', a: 'Yes, you get 3 free compressions per day. Unlimited with Pro at $7/month.' },
        { q: 'Can I compress multiple PDFs at once?', a: 'Yes! Free users can batch compress up to 3 PDFs. Pro users can process up to 20 PDFs simultaneously.' },
        { q: 'Will the quality be affected?', a: 'Recommended mode reduces size with minimal quality loss. Extreme mode compresses more aggressively.' },
        { q: 'Is my file secure?', a: 'Yes, all files are automatically deleted from our servers after 1 hour.' },
      ],
    },
    es: {
      howTitle: 'Cómo comprimir un PDF',
      steps: [
        { title: 'Sube tu(s) PDF(s)', desc: 'Arrastra uno o varios archivos PDF para comprimir.' },
        { title: 'Elige el nivel de compresión', desc: 'Selecciona recomendado (mejor equilibrio) o extremo (tamaño mínimo).' },
        { title: 'Descarga los PDFs comprimidos', desc: 'Haz clic en comprimir y descarga tus PDFs más pequeños o archivo ZIP.' },
      ],
      faqs: [
        { q: '¿Es gratis comprimir PDFs?', a: 'Sí, tienes 3 compresiones gratis al día. Ilimitado con Pro a $7/mes.' },
        { q: '¿Puedo comprimir varios PDFs a la vez?', a: 'Sí. Los usuarios gratuitos pueden comprimir hasta 3 PDFs. Los usuarios Pro hasta 20 simultáneamente.' },
        { q: '¿Se verá afectada la calidad?', a: 'El modo recomendado reduce el tamaño con pérdida mínima de calidad. El modo extremo comprime más agresivamente.' },
        { q: '¿Está seguro mi archivo?', a: 'Sí, todos los archivos se eliminan automáticamente de nuestros servidores después de 1 hora.' },
      ],
    },
  },
  pdfToWord: {
    en: {
      howTitle: 'How to Convert PDF to Word',
      steps: [
        { title: 'Upload your PDF', desc: 'Drag and drop your PDF or click to browse your files.' },
        { title: 'Convert automatically', desc: 'FileXone converts your PDF to an editable DOCX file in seconds.' },
        { title: 'Download your Word file', desc: 'Click download to save your editable Word document.' },
      ],
      faqs: [
        { q: 'Is PDF to Word conversion free?', a: 'Yes, 3 free conversions per day. Unlimited with Pro at $7/month.' },
        { q: 'Will formatting be preserved?', a: 'Yes, FileXone preserves tables, images and formatting as closely as possible.' },
        { q: 'What is the maximum file size?', a: 'Up to 100MB per file.' },
        { q: 'Is my file secure?', a: 'Yes, files are automatically deleted from our servers after 1 hour.' },
      ],
    },
    es: {
      howTitle: 'Cómo convertir PDF a Word',
      steps: [
        { title: 'Sube tu PDF', desc: 'Arrastra tu PDF o haz clic para seleccionar el archivo.' },
        { title: 'Conversión automática', desc: 'FileXone convierte tu PDF a un archivo DOCX editable en segundos.' },
        { title: 'Descarga tu archivo Word', desc: 'Haz clic en descargar para guardar tu documento Word editable.' },
      ],
      faqs: [
        { q: '¿Es gratis convertir PDF a Word?', a: 'Sí, 3 conversiones gratis al día. Ilimitado con Pro a $7/mes.' },
        { q: '¿Se conservará el formato?', a: 'Sí, FileXone conserva tablas, imágenes y formato lo más fielmente posible.' },
        { q: '¿Cuál es el tamaño máximo de archivo?', a: 'Hasta 100MB por archivo.' },
        { q: '¿Está seguro mi archivo?', a: 'Sí, los archivos se eliminan automáticamente de nuestros servidores después de 1 hora.' },
      ],
    },
  },
  merge: {
    en: {
      howTitle: 'How to Merge PDF Files',
      steps: [
        { title: 'Upload your PDFs', desc: 'Select two or more PDF files you want to combine.' },
        { title: 'Arrange the order', desc: 'Reorder files by dragging them into the sequence you want.' },
        { title: 'Download merged PDF', desc: 'Click merge and download your single combined PDF file.' },
      ],
      faqs: [
        { q: 'Is merging PDFs free?', a: 'Yes, 3 free merges per day. Unlimited with Pro at $7/month.' },
        { q: 'How many PDFs can I combine?', a: 'You can combine as many PDFs as you need in a single merge.' },
        { q: 'What is the maximum file size?', a: 'Up to 100MB per file.' },
        { q: 'Is my file secure?', a: 'Yes, files are automatically deleted from our servers after 1 hour.' },
      ],
    },
    es: {
      howTitle: 'Cómo unir archivos PDF',
      steps: [
        { title: 'Sube tus PDFs', desc: 'Selecciona dos o más archivos PDF que quieras combinar.' },
        { title: 'Ordena los archivos', desc: 'Reordena los archivos arrastrándolos en la secuencia que desees.' },
        { title: 'Descarga el PDF unido', desc: 'Haz clic en unir y descarga tu archivo PDF combinado.' },
      ],
      faqs: [
        { q: '¿Es gratis unir PDFs?', a: 'Sí, 3 uniones gratis al día. Ilimitado con Pro a $7/mes.' },
        { q: '¿Cuántos PDFs puedo combinar?', a: 'Puedes combinar tantos PDFs como necesites en una sola operación.' },
        { q: '¿Cuál es el tamaño máximo de archivo?', a: 'Hasta 100MB por archivo.' },
        { q: '¿Está seguro mi archivo?', a: 'Sí, los archivos se eliminan automáticamente de nuestros servidores después de 1 hora.' },
      ],
    },
  },
  split: {
    en: {
      howTitle: 'How to Split a PDF',
      steps: [
        { title: 'Upload your PDF(s)', desc: 'Drag and drop one or multiple PDFs to split.' },
        { title: 'Choose split mode', desc: 'Extract specific pages by range, or split into individual pages.' },
        { title: 'Download split files', desc: 'Download your extracted pages as ZIP archives.' },
      ],
      faqs: [
        { q: 'Is splitting a PDF free?', a: 'Yes, 3 free splits per day. Unlimited with Pro at $7/month.' },
        { q: 'Can I split multiple PDFs at once?', a: 'Yes! Free users can process up to 3 PDFs at once, Pro users up to 20.' },
        { q: 'Can I extract specific pages?', a: 'Yes, enter page ranges like "1, 3-5, 8" to extract exactly the pages you need.' },
        { q: 'Is my file secure?', a: 'Yes, files are automatically deleted from our servers after 1 hour.' },
      ],
    },
    es: {
      howTitle: 'Cómo dividir un PDF',
      steps: [
        { title: 'Sube tu(s) PDF(s)', desc: 'Arrastra uno o varios PDFs para dividir.' },
        { title: 'Elige el modo de división', desc: 'Extrae páginas específicas por rango o divide en páginas individuales.' },
        { title: 'Descarga los archivos', desc: 'Descarga tus páginas extraídas como archivos ZIP.' },
      ],
      faqs: [
        { q: '¿Es gratis dividir un PDF?', a: 'Sí, 3 divisiones gratis al día. Ilimitado con Pro a $7/mes.' },
        { q: '¿Puedo dividir varios PDFs a la vez?', a: 'Sí. Los usuarios gratuitos pueden procesar hasta 3 PDFs. Los usuarios Pro hasta 20.' },
        { q: '¿Puedo extraer páginas específicas?', a: 'Sí, introduce rangos de páginas como "1, 3-5, 8" para extraer exactamente las páginas que necesitas.' },
        { q: '¿Está seguro mi archivo?', a: 'Sí, los archivos se eliminan automáticamente de nuestros servidores después de 1 hora.' },
      ],
    },
  },
  pdfToJpg: {
    en: {
      howTitle: 'How to Convert PDF to JPG',
      steps: [
        { title: 'Upload your PDF(s)', desc: 'Drag and drop one or multiple PDFs to convert to images.' },
        { title: 'Choose image quality', desc: 'Select standard (150 DPI) or high quality (300 DPI) output.' },
        { title: 'Download your images', desc: 'Download all converted JPG images in a ZIP file.' },
      ],
      faqs: [
        { q: 'Is PDF to JPG conversion free?', a: 'Yes, 3 free conversions per day. Unlimited with Pro at $7/month.' },
        { q: 'Can I convert multiple PDFs at once?', a: 'Yes! Free users can convert up to 3 PDFs at once, Pro users up to 20.' },
        { q: 'What quality will the images be?', a: 'Standard mode outputs 150 DPI images. High quality mode outputs 300 DPI, ideal for printing.' },
        { q: 'Is my file secure?', a: 'Yes, files are automatically deleted from our servers after 1 hour.' },
      ],
    },
    es: {
      howTitle: 'Cómo convertir PDF a JPG',
      steps: [
        { title: 'Sube tu(s) PDF(s)', desc: 'Arrastra uno o varios PDFs para convertir a imágenes.' },
        { title: 'Elige la calidad de imagen', desc: 'Selecciona estándar (150 DPI) o alta calidad (300 DPI).' },
        { title: 'Descarga tus imágenes', desc: 'Descarga todas las imágenes JPG convertidas en un archivo ZIP.' },
      ],
      faqs: [
        { q: '¿Es gratis convertir PDF a JPG?', a: 'Sí, 3 conversiones gratis al día. Ilimitado con Pro a $7/mes.' },
        { q: '¿Puedo convertir varios PDFs a la vez?', a: 'Sí. Los usuarios gratuitos pueden convertir hasta 3 PDFs. Los usuarios Pro hasta 20.' },
        { q: '¿Qué calidad tendrán las imágenes?', a: 'El modo estándar genera imágenes de 150 DPI. El modo alta calidad genera 300 DPI, ideal para impresión.' },
        { q: '¿Está seguro mi archivo?', a: 'Sí, los archivos se eliminan automáticamente de nuestros servidores después de 1 hora.' },
      ],
    },
  },
  wordToPdf: {
    en: {
      howTitle: 'How to Convert Word to PDF',
      steps: [
        { title: 'Upload your document', desc: 'Select your DOCX, PPTX, or XLSX file.' },
        { title: 'Convert automatically', desc: 'FileXone converts your Office document to PDF while preserving layout.' },
        { title: 'Download your PDF', desc: 'Download your perfectly formatted PDF file.' },
      ],
      faqs: [
        { q: 'Is Word to PDF conversion free?', a: 'Yes, 3 free conversions per day. Unlimited with Pro at $7/month.' },
        { q: 'Which file types are supported?', a: 'DOCX, DOC, PPTX, and XLSX files are all supported.' },
        { q: 'What is the maximum file size?', a: 'Up to 100MB per file.' },
        { q: 'Is my file secure?', a: 'Yes, files are automatically deleted from our servers after 1 hour.' },
      ],
    },
    es: {
      howTitle: 'Cómo convertir Word a PDF',
      steps: [
        { title: 'Sube tu documento', desc: 'Selecciona tu archivo DOCX, PPTX o XLSX.' },
        { title: 'Conversión automática', desc: 'FileXone convierte tu documento de Office a PDF conservando el formato.' },
        { title: 'Descarga tu PDF', desc: 'Descarga tu archivo PDF perfectamente formateado.' },
      ],
      faqs: [
        { q: '¿Es gratis convertir Word a PDF?', a: 'Sí, 3 conversiones gratis al día. Ilimitado con Pro a $7/mes.' },
        { q: '¿Qué tipos de archivo se admiten?', a: 'Se admiten archivos DOCX, DOC, PPTX y XLSX.' },
        { q: '¿Cuál es el tamaño máximo de archivo?', a: 'Hasta 100MB por archivo.' },
        { q: '¿Está seguro mi archivo?', a: 'Sí, los archivos se eliminan automáticamente de nuestros servidores después de 1 hora.' },
      ],
    },
  },
  signPdf: {
    en: {
      howTitle: 'How to Sign a PDF Online',
      steps: [
        { title: 'Upload your PDF', desc: 'Drag and drop or select the PDF document you need to sign.' },
        { title: 'Create your signature', desc: 'Draw your signature with your mouse or finger, or type your name.' },
        { title: 'Download signed PDF', desc: 'Download your signed document ready to share or send.' },
      ],
      faqs: [
        { q: 'Is PDF signing free?', a: 'Yes, 3 free signatures per day. Unlimited with Pro at $7/month.' },
        { q: 'Is an electronic signature legally valid?', a: 'In most countries, electronic signatures are legally recognized. Check local regulations for compliance.' },
        { q: 'What is the maximum file size?', a: 'Up to 100MB per file.' },
        { q: 'Is my file secure?', a: 'Yes, files are automatically deleted from our servers after 1 hour.' },
      ],
    },
    es: {
      howTitle: 'Cómo firmar un PDF online',
      steps: [
        { title: 'Sube tu PDF', desc: 'Arrastra o selecciona el documento PDF que necesitas firmar.' },
        { title: 'Crea tu firma', desc: 'Dibuja tu firma con el ratón o el dedo, o escribe tu nombre.' },
        { title: 'Descarga el PDF firmado', desc: 'Descarga tu documento firmado listo para compartir o enviar.' },
      ],
      faqs: [
        { q: '¿Es gratis firmar PDFs?', a: 'Sí, 3 firmas gratis al día. Ilimitado con Pro a $7/mes.' },
        { q: '¿Es legalmente válida una firma electrónica?', a: 'En la mayoría de los países, las firmas electrónicas están legalmente reconocidas. Consulta la normativa local.' },
        { q: '¿Cuál es el tamaño máximo de archivo?', a: 'Hasta 100MB por archivo.' },
        { q: '¿Está seguro mi archivo?', a: 'Sí, los archivos se eliminan automáticamente de nuestros servidores después de 1 hora.' },
      ],
    },
  },
  organizePdf: {
    en: {
      howTitle: 'How to Organize PDF Pages',
      steps: [
        { title: 'Upload your PDF', desc: 'Drag and drop or select the PDF whose pages you want to organize.' },
        { title: 'Rotate or delete pages', desc: 'Click the rotate icon to turn pages 90°, or the trash icon to remove pages.' },
        { title: 'Download organized PDF', desc: 'Save your newly organized PDF with one click.' },
      ],
      faqs: [
        { q: 'Is PDF organization free?', a: 'Yes, 3 free operations per day. Unlimited with Pro at $7/month.' },
        { q: 'Can I reorder pages?', a: 'Yes, you can rotate and delete pages. Full drag-to-reorder is available with Pro.' },
        { q: 'What is the maximum file size?', a: 'Up to 100MB per file.' },
        { q: 'Is my file secure?', a: 'Yes, files are automatically deleted from our servers after 1 hour.' },
      ],
    },
    es: {
      howTitle: 'Cómo organizar páginas de un PDF',
      steps: [
        { title: 'Sube tu PDF', desc: 'Arrastra o selecciona el PDF cuyas páginas quieres organizar.' },
        { title: 'Rota o elimina páginas', desc: 'Haz clic en el icono de rotar para girar páginas 90°, o en la papelera para eliminarlas.' },
        { title: 'Descarga el PDF organizado', desc: 'Guarda tu PDF recién organizado con un solo clic.' },
      ],
      faqs: [
        { q: '¿Es gratis organizar PDFs?', a: 'Sí, 3 operaciones gratis al día. Ilimitado con Pro a $7/mes.' },
        { q: '¿Puedo reordenar páginas?', a: 'Sí, puedes rotar y eliminar páginas. El arrastre completo para reordenar está disponible con Pro.' },
        { q: '¿Cuál es el tamaño máximo de archivo?', a: 'Hasta 100MB por archivo.' },
        { q: '¿Está seguro mi archivo?', a: 'Sí, los archivos se eliminan automáticamente de nuestros servidores después de 1 hora.' },
      ],
    },
  },
  pdfToExcel: {
    en: {
      howTitle: 'How to Convert PDF to Excel',
      steps: [
        { title: 'Upload your PDF', desc: 'Select the PDF containing the tables or data you want to extract.' },
        { title: 'Convert automatically', desc: 'FileXone detects and extracts tables into an editable Excel spreadsheet.' },
        { title: 'Download your XLSX file', desc: 'Download your Excel file ready for editing.' },
      ],
      faqs: [
        { q: 'Is PDF to Excel conversion free?', a: 'Yes, 3 free conversions per day. Unlimited with Pro at $7/month.' },
        { q: 'Will table formatting be preserved?', a: 'Yes, FileXone extracts table data and preserves cell structure in the Excel output.' },
        { q: 'What is the maximum file size?', a: 'Up to 100MB per file.' },
        { q: 'Is my file secure?', a: 'Yes, files are automatically deleted from our servers after 1 hour.' },
      ],
    },
    es: {
      howTitle: 'Cómo convertir PDF a Excel',
      steps: [
        { title: 'Sube tu PDF', desc: 'Selecciona el PDF que contiene las tablas o datos que quieres extraer.' },
        { title: 'Conversión automática', desc: 'FileXone detecta y extrae tablas a una hoja de cálculo Excel editable.' },
        { title: 'Descarga tu archivo XLSX', desc: 'Descarga tu archivo Excel listo para editar.' },
      ],
      faqs: [
        { q: '¿Es gratis convertir PDF a Excel?', a: 'Sí, 3 conversiones gratis al día. Ilimitado con Pro a $7/mes.' },
        { q: '¿Se conservará el formato de las tablas?', a: 'Sí, FileXone extrae los datos de las tablas y conserva la estructura de celdas en el archivo Excel.' },
        { q: '¿Cuál es el tamaño máximo de archivo?', a: 'Hasta 100MB por archivo.' },
        { q: '¿Está seguro mi archivo?', a: 'Sí, los archivos se eliminan automáticamente de nuestros servidores después de 1 hora.' },
      ],
    },
  },
  protectPdf: {
    en: {
      howTitle: 'How to Protect a PDF with a Password',
      steps: [
        { title: 'Upload your PDF', desc: 'Drag and drop or select the PDF you want to password-protect.' },
        { title: 'Enter a password', desc: 'Type the password that will be required to open the document.' },
        { title: 'Download protected PDF', desc: 'Download your password-locked PDF file.' },
      ],
      faqs: [
        { q: 'Is PDF password protection free?', a: 'Yes, 3 free operations per day. Unlimited with Pro at $7/month.' },
        { q: 'What encryption is used?', a: 'FileXone applies 128-bit AES encryption to protect your PDF.' },
        { q: 'What is the maximum file size?', a: 'Up to 100MB per file.' },
        { q: 'Is my file secure?', a: 'Yes, files are automatically deleted from our servers after 1 hour.' },
      ],
    },
    es: {
      howTitle: 'Cómo proteger un PDF con contraseña',
      steps: [
        { title: 'Sube tu PDF', desc: 'Arrastra o selecciona el PDF que quieres proteger con contraseña.' },
        { title: 'Introduce una contraseña', desc: 'Escribe la contraseña que se requerirá para abrir el documento.' },
        { title: 'Descarga el PDF protegido', desc: 'Descarga tu archivo PDF bloqueado con contraseña.' },
      ],
      faqs: [
        { q: '¿Es gratis proteger PDFs con contraseña?', a: 'Sí, 3 operaciones gratis al día. Ilimitado con Pro a $7/mes.' },
        { q: '¿Qué cifrado se utiliza?', a: 'FileXone aplica cifrado AES de 128 bits para proteger tu PDF.' },
        { q: '¿Cuál es el tamaño máximo de archivo?', a: 'Hasta 100MB por archivo.' },
        { q: '¿Está seguro mi archivo?', a: 'Sí, los archivos se eliminan automáticamente de nuestros servidores después de 1 hora.' },
      ],
    },
  },
  pdfToPowerpoint: {
    en: {
      howTitle: 'How to Convert PDF to PowerPoint',
      steps: [
        { title: 'Upload your PDF', desc: 'Drag and drop or select the PDF you want to turn into slides.' },
        { title: 'Convert automatically', desc: 'FileXone converts each PDF page into an editable PowerPoint slide.' },
        { title: 'Download your PPTX file', desc: 'Download your PowerPoint presentation ready for editing.' },
      ],
      faqs: [
        { q: 'Is PDF to PowerPoint conversion free?', a: 'Yes, 3 free conversions per day. Unlimited with Pro at $7/month.' },
        { q: 'Will slide content be editable?', a: 'Yes, each page is converted into a fully editable PPTX slide.' },
        { q: 'What is the maximum file size?', a: 'Up to 100MB per file.' },
        { q: 'Is my file secure?', a: 'Yes, files are automatically deleted from our servers after 1 hour.' },
      ],
    },
    es: {
      howTitle: 'Cómo convertir PDF a PowerPoint',
      steps: [
        { title: 'Sube tu PDF', desc: 'Arrastra o selecciona el PDF que quieres convertir en diapositivas.' },
        { title: 'Conversión automática', desc: 'FileXone convierte cada página del PDF en una diapositiva PowerPoint editable.' },
        { title: 'Descarga tu archivo PPTX', desc: 'Descarga tu presentación PowerPoint lista para editar.' },
      ],
      faqs: [
        { q: '¿Es gratis convertir PDF a PowerPoint?', a: 'Sí, 3 conversiones gratis al día. Ilimitado con Pro a $7/mes.' },
        { q: '¿El contenido de las diapositivas será editable?', a: 'Sí, cada página se convierte en una diapositiva PPTX completamente editable.' },
        { q: '¿Cuál es el tamaño máximo de archivo?', a: 'Hasta 100MB por archivo.' },
        { q: '¿Está seguro mi archivo?', a: 'Sí, los archivos se eliminan automáticamente de nuestros servidores después de 1 hora.' },
      ],
    },
  },
  webToPdf: {
    en: {
      howTitle: 'How to Convert a Webpage to PDF',
      steps: [
        { title: 'Enter a URL', desc: 'Paste any website URL into the input field.' },
        { title: 'Convert automatically', desc: 'FileXone captures the full page and converts it to a PDF document.' },
        { title: 'Download your PDF', desc: 'Download the complete webpage as a PDF file.' },
      ],
      faqs: [
        { q: 'Is web to PDF conversion free?', a: 'Yes, 3 free conversions per day. Unlimited with Pro at $7/month.' },
        { q: 'Which websites are supported?', a: 'Any publicly accessible website URL can be converted to PDF.' },
        { q: 'Will the full page be captured?', a: 'Yes, FileXone captures the entire webpage including content below the fold.' },
        { q: 'Is my data secure?', a: 'Yes, the generated PDF is automatically deleted from our servers after 1 hour.' },
      ],
    },
    es: {
      howTitle: 'Cómo convertir una página web a PDF',
      steps: [
        { title: 'Introduce una URL', desc: 'Pega cualquier URL de sitio web en el campo de entrada.' },
        { title: 'Conversión automática', desc: 'FileXone captura la página completa y la convierte en un documento PDF.' },
        { title: 'Descarga tu PDF', desc: 'Descarga la página web completa como archivo PDF.' },
      ],
      faqs: [
        { q: '¿Es gratis convertir webs a PDF?', a: 'Sí, 3 conversiones gratis al día. Ilimitado con Pro a $7/mes.' },
        { q: '¿Qué sitios web son compatibles?', a: 'Cualquier URL de sitio web de acceso público puede convertirse a PDF.' },
        { q: '¿Se capturará la página completa?', a: 'Sí, FileXone captura toda la página web incluyendo el contenido inferior.' },
        { q: '¿Están seguros mis datos?', a: 'Sí, el PDF generado se elimina automáticamente de nuestros servidores después de 1 hora.' },
      ],
    },
  },
};

const BENEFITS = {
  en: [
    '100% free — no sign-up required for basic use',
    'Files are automatically deleted after 1 hour',
    'Works on any device — desktop, tablet, or mobile',
    'Unlimited conversions with Pro at just $7/month',
  ],
  es: [
    '100% gratis — sin registro para uso básico',
    'Los archivos se eliminan automáticamente después de 1 hora',
    'Funciona en cualquier dispositivo — ordenador, tablet o móvil',
    'Conversiones ilimitadas con Pro por solo $7/mes',
  ],
};

const UI_TEXT = {
  en: { whyTitle: 'Why use FileXone?', faqTitle: 'Frequently Asked Questions' },
  es: { whyTitle: '¿Por qué usar FileXone?', faqTitle: 'Preguntas Frecuentes' },
};

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-muted/30 transition-colors"
      >
        <span className="font-semibold text-sm text-foreground pr-4">{q}</span>
        <ChevronDown className={`w-4 h-4 text-muted-foreground flex-shrink-0 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
      </button>
      {open && (
        <div className="px-4 pb-3">
          <p className="text-sm text-muted-foreground">{a}</p>
        </div>
      )}
    </div>
  );
}

function useIsMobile() {
  const [mobile, setMobile] = useState(() => typeof window !== 'undefined' && window.innerWidth < 768);
  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  return mobile;
}

export default function ToolSEOContent({ toolKey }) {
  const { lang } = useI18n();
  const mobile = useIsMobile();
  const l = lang === 'es' ? 'es' : 'en';
  const data = TOOL_DATA[toolKey]?.[l];
  const ui = UI_TEXT[l];
  const benefits = BENEFITS[l];

  if (!data) return null;

  return (
    <div className="max-w-4xl mx-auto px-4 mt-12 pb-12">
      {/* Row 1: Two columns side by side */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: mobile ? '1fr' : '1fr 1fr',
        gap: '2rem',
        margin: '3rem 0',
        padding: '2rem',
        border: '1px solid #e5e7eb',
        borderRadius: '16px',
        background: '#fafafa',
      }}>
        {/* How to — LEFT */}
        <div style={mobile ? {} : { borderRight: '1px solid #e5e7eb', paddingRight: '2rem' }}>
          <h2 className="text-base font-bold text-foreground mb-5">{data.howTitle}</h2>
          <ol className="space-y-4">
            {data.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="flex-shrink-0 w-7 h-7 rounded-full bg-primary/10 text-primary font-bold text-xs flex items-center justify-center">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-sm text-foreground">{step.title}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        {/* Why FileXone — RIGHT */}
        <div style={mobile ? {} : { paddingLeft: '1rem' }}>
          <h2 className="text-base font-bold text-foreground mb-5">{ui.whyTitle}</h2>
          <ul className="space-y-3">
            {benefits.map((benefit, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                <span className="text-sm text-muted-foreground">{benefit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Row 2: FAQ full width */}
      <section>
        <h2 className="text-base font-bold text-foreground mb-4">{ui.faqTitle}</h2>
        <div className="space-y-2">
          {data.faqs.map((faq, i) => (
            <FaqItem key={i} q={faq.q} a={faq.a} />
          ))}
        </div>
      </section>
    </div>
  );
}