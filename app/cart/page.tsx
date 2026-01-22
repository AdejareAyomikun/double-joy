// "use client";

// import Header from "../components/Header";
// import { useCart } from "../context/CartContext";
// import Image from "next/image";

// export default function CartPage() {
//   const { cart, loading, clearCart } = useCart();

//   if (loading) return <div>Loading cart...</div>;
//   if (!cart || cart.items.length === 0) return <div>Your cart is empty</div>;

//   const totalPrice = cart.items.reduce(
//     (acc, item) => acc + item.price * item.quantity,
//     0
//   );

//   return (
//     <>
//       <Header />
//        <div className="p-5 max-w-4xl mx-auto">
//         <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

//         <ul className="space-y-4">
//           {cart.items.map((item) => (
//             <li
//               key={item.id}
//               className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
//             >
//               <div className="flex items-center space-x-4">
//                 <div className="w-24 h-24 relative">
//                   <Image
//                     src={item.product_image}
//                     alt={item.product_name}
//                     fill
//                     className="object-cover rounded"
//                     unoptimized
//                   />
//                 </div>
//                 <div>
//                   <h3 className="text-lg font-semibold">{item.product_name}</h3>
//                   <p className="text-gray-600">
//                     Quantity: {item.quantity} x #{item.price}
//                   </p>
//                   <p className="text-gray-800 font-medium">
//                     Subtotal: #{item.price * item.quantity}
//                   </p>
//                 </div>
//               </div>
//             </li>
//           ))}
//         </ul>

//         <div className="mt-6 flex justify-between items-center">
//           <span className="text-xl font-bold">Total: ${totalPrice}</span>
//           <button
//             onClick={clearCart}
//             className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200"
//           >
//             Clear Cart
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }
// version 1

"use client";

import { Link } from "lucide-react";
import api from "@/api/axios";
import Footer from "../components/Footer";
import Header from "../components/Header";
import { useCart } from "../context/CartContext";
import Image from "next/image";

export default function CartPage() {
  const { cart, loading, clearCart, addToCart, removeItem } = useCart();
  if (loading) return <div>Loading cart...</div>;
  if (!cart || cart.items.length === 0)
    return (
      <>
        <Header /> 
        <div className="flex justify-center min-h-screen text-5xl">
          Your cart is empty
        </div>
        <Footer />
      </>
    );

  const totalPrice = cart.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  const handleIncrease = async (itemId: number, productId: number) => {
    await addToCart(productId, 1); // increment by 1
  };

  const handleDecrease = async (
    itemId: number,
    productId: number,
    quantity: number
  ) => {
    if (quantity <= 0) return; // prevent quantity < 1
    await addToCart(productId, -1); // decrement by 1
  };


  return (
    <>
      <Header />
      <div className="p-5 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Your Cart</h1>

        <ul className="space-y-4">
          {cart.items.map((item) => (
            <li
              key={item.id}
              className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center space-x-4">
                <div className="w-24 h-24 relative">
                  {/* <Link key={item.product_name} href={`/product/${item.id}`}> */}
                  <Image
                    src={item.product_image}
                    alt={item.product_name}
                    fill
                    className="object-cover rounded"
                    unoptimized
                  />
                  {/* </Link> */}
                </div>
                <div>
                  <h3 className="text-lg font-semibold">{item.product_name}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <button
                      onClick={() =>
                        handleDecrease(item.id, item.product, item.quantity)
                      }
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                    >
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleIncrease(item.id, item.product)}
                      className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 cursor-pointer"
                    >
                      +
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="ml-4 text-red-600 hover:underline cursor-pointer"
                    >
                      Remove
                    </button>
                  </div>
                  <p className="text-gray-800 font-medium mt-1">
                    Subtotal: #{item.price * item.quantity}
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-6 flex justify-between items-center">
          <span className="text-xl font-bold">Total: #{totalPrice}</span>
          <button
            onClick={clearCart}
            className="bg-red-600 text-white px-6 py-2 rounded-lg hover:bg-red-700 transition-colors duration-200 cursor-pointer"
          >
            Clear Cart
          </button>
          <a href="/checkout" className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200">
            Proceed to Checkout
          </a>
        </div>
      </div>
    </>
  );
}
