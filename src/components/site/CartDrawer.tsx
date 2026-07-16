import { motion, AnimatePresence } from "framer-motion";
import { HiX, HiPlus, HiMinus, HiTrash } from "react-icons/hi";
import { FaWhatsapp } from "react-icons/fa";
import { useCart } from "@/hooks/use-cart";
import { toast } from "sonner";

export function CartDrawer() {
  const {
    cartItems,
    isCartOpen,
    setCartOpen,
    updateQuantity,
    removeFromCart,
    cartTotal,
    clearCart,
  } = useCart();

  const handleWhatsAppOrder = () => {
    if (cartItems.length === 0) return;

    // Format the order list as a beautiful receipt
    const header = "🧾 *GANESH DHABA - ORDER BILL* 🧾\n";
    const line = "-----------------------------------\n";
    const itemsList = cartItems
      .map(
        (item) =>
          `• *${item.name}* x ${item.quantity}\n  Price: ₹${item.price} | Total: *₹${
            item.price * item.quantity
          }*`
      )
      .join("\n\n");
    const footer = `\n${line}💰 *Grand Total:* ₹${cartTotal}\n${line}📍 Please prepare this order. Thank you!`;

    const fullMessage = `${header}${line}${itemsList}${footer}`;
    const encodedMessage = encodeURIComponent(fullMessage);
    const phoneNumber = "918949993211"; // Default phone number from layout
    const waUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;

    toast.success("Opening WhatsApp...", {
      description: "Redirecting to place your order.",
    });

    window.open(waUrl, "_blank");
    clearCart();
    setCartOpen(false);
  };

  return (
    <AnimatePresence>
      {isCartOpen && (
        <>
          {/* Backdrop Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs"
          />

          {/* Cart Sidebar Panel */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 220 }}
            className="fixed bottom-0 right-0 top-0 z-[60] flex h-full w-full flex-col bg-card shadow-2xl sm:w-[450px] border-l border-border"
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border px-6 py-5">
              <div className="flex items-center gap-2">
                <span className="font-display text-xl font-bold">Your Order</span>
                {cartItems.length > 0 && (
                  <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[11px] font-bold text-primary-foreground">
                    {cartItems.reduce((acc, i) => acc + i.quantity, 0)}
                  </span>
                )}
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="rounded-full border border-border p-1.5 text-foreground/75 hover:bg-secondary transition hover:text-foreground"
                aria-label="Close cart"
              >
                <HiX size={20} />
              </button>
            </div>

            {/* Scrollable Items List */}
            <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
              {cartItems.length === 0 ? (
                /* Empty state */
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <div className="rounded-full bg-primary/10 p-5 text-primary">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                      className="h-12 w-12"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                      />
                    </svg>
                  </div>
                  <h3 className="mt-4 font-display text-lg font-bold">Your cart is empty</h3>
                  <p className="mt-1 text-sm text-muted-foreground max-w-[240px]">
                    Explore our delicious handcrafted menu and add dishes to your order.
                  </p>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      // Scroll to menu
                      const menuEl = document.getElementById("menu");
                      if (menuEl) {
                        menuEl.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="mt-6 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:brightness-115 transition"
                  >
                    Browse Menu
                  </button>
                </div>
              ) : (
                /* Items list */
                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 rounded-2xl border border-border p-3 shadow-soft hover:shadow-elegant transition"
                    >
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 shrink-0 rounded-xl object-cover border border-border"
                        />
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <h4 className="font-display text-sm font-semibold truncate leading-tight text-foreground">
                            {item.name}
                          </h4>
                          <span className="font-display text-sm font-bold text-primary shrink-0">
                            ₹{item.price * item.quantity}
                          </span>
                        </div>
                        <span className="text-xs text-muted-foreground block mt-0.5">
                          ₹{item.price} each • {item.category}
                        </span>

                        <div className="mt-3 flex items-center justify-between">
                          {/* Quantity Selector */}
                          <div className="flex items-center border border-border rounded-full bg-secondary/50">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 px-2.5 text-muted-foreground hover:text-foreground transition rounded-l-full"
                              aria-label="Decrease quantity"
                            >
                              <HiMinus size={12} />
                            </button>
                            <span className="px-2 text-xs font-bold font-mono min-w-4 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 px-2.5 text-muted-foreground hover:text-foreground transition rounded-r-full"
                              aria-label="Increase quantity"
                            >
                              <HiPlus size={12} />
                            </button>
                          </div>

                          {/* Delete Button */}
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1.5 text-muted-foreground hover:text-destructive hover:bg-destructive/10 rounded-full transition"
                            aria-label="Remove item"
                          >
                            <HiTrash size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Summary & WhatsApp Order Button */}
            {cartItems.length > 0 && (
              <div className="border-t border-border bg-card px-6 py-6 space-y-4 shadow-[0_-10px_30px_rgba(0,0,0,0.04)]">
                <p className="text-center text-sm font-bold text-destructive uppercase tracking-tight">
                  no home delivery, pick your parcel by yourself
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Subtotal</span>
                    <span>₹{cartTotal}</span>
                  </div>
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>Packaging</span>
                    <span className="text-emerald-600 font-medium">Free</span>
                  </div>
                  <div className="border-t border-dashed border-border my-2 pt-2 flex justify-between font-display text-lg font-bold text-foreground">
                    <span>Grand Total</span>
                    <span className="text-primary">₹{cartTotal}</span>
                  </div>
                </div>

                {/* WhatsApp Order Button */}
                <button
                  onClick={handleWhatsAppOrder}
                  className="relative flex w-full items-center justify-center gap-2 rounded-full bg-[#25D366] py-4 text-sm font-bold text-white shadow-[0_10px_30px_-8px_rgba(37,211,102,0.6)] transition hover:brightness-105 active:scale-98 select-none"
                >
                  <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-[#25D366]/20" />
                  <FaWhatsapp size={20} />
                  Order on WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
