export const WHATSAPP_NUMBER = "212660308681";

export function buildWhatsAppURL(
  productName?: string,
  lang: "fr" | "ar" = "fr"
): string {
  const messages = {
    fr: productName
      ? `Bonjour Argan Tassila, je souhaite commander : ${productName}. Pouvez-vous me confirmer la disponibilité et le prix de livraison ?`
      : `Bonjour Argan Tassila, je voudrais passer une commande. Pouvez-vous m'aider ?`,
    ar: productName
      ? `مرحبا تعاونية أرگان تاسيلا، أرغب في طلب: ${productName}. هل يمكنكم تأكيد التوفر وتكاليف التوصيل؟`
      : `مرحبا تعاونية أرگان تاسيلا، أريد تقديم طلب. هل يمكنكم مساعدتي؟`,
  };
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messages[lang])}`;
}
