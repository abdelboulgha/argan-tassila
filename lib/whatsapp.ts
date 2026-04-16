export const WHATSAPP_NUMBER = "212637817229";

export function buildWhatsAppURL(
  productName?: string,
  lang: "fr" | "ar" = "fr",
  size?: string
): string {
  const productWithSize = productName
    ? size
      ? `${productName} (${size})`
      : productName
    : undefined;

  const messages = {
    fr: productWithSize
      ? `Bonjour Argan Tassila, je souhaite commander : ${productWithSize}. Pouvez-vous me confirmer la disponibilité et le prix de livraison ?`
      : `Bonjour Argan Tassila, je voudrais passer une commande. Pouvez-vous m'aider ?`,
    ar: productWithSize
      ? `مرحبا تعاونية أرگان تاسيلا، أرغب في طلب: ${productWithSize}. هل يمكنكم تأكيد التوفر وتكاليف التوصيل؟`
      : `مرحبا تعاونية أرگان تاسيلا، أريد تقديم طلب. هل يمكنكم مساعدتي؟`,
  };
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(messages[lang])}`;
}
