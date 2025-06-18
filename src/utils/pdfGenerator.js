import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export const generatePDF = async (elementId, filename = "resume.pdf") => {
  try {
    const elementToCapture = document.getElementById(elementId);

    if (!elementToCapture) {
      console.error(
        `Element with ID "${elementId}" not found for PDF generation`
      );
      throw new Error(
        `Element with ID "${elementId}" not found for PDF generation`
      );
    }

    await new Promise((resolve) => setTimeout(resolve, 500)); // Ensure rendering

    const canvas = await html2canvas(elementToCapture, {
      scale: 2,
      useCORS: true,
      scrollX: 0,
      scrollY: -window.scrollY,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save(filename);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};
