// "use client";

// import { useState } from "react";
// import { createProduct, getCategories } from "../../api/products";
// import { ChevronRight } from "lucide-react";
// import Header from "../../components/Header";
// // import { categories } from "@/lib/productData";

// export default function AddProduct() {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState(0);
//   const [stock, setStock] = useState(0);
//   const [image, setImage] = useState<File | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const form = new FormData();
//     form.append("name", name);
//     form.append("description", description);
//     form.append("price", parseFloat(price));
//     form.append("stock", stock);
//     form.append("category", category);
//     if (image) form.append("image", image);

//     try {
//       const res = await createProduct(form);
//       alert("Product created!");
//       console.log("Created:", res);
//     } catch (err) {
//       console.error(err);
//       alert("Error creating product");
//     }
//   };

//   return (
//     <>
//       <Header />
//       <div className="m-5 p-10 bg-gray-100">
//         <header className="flex sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
//           <h1 className="flex text-3xl font-bold text-gray-800">
//             <span className="flex text-gray-400">
//               Admin Dashboard <ChevronRight size={40} />
//             </span>{" "}
//             Add Product
//           </h1>
//         </header>
//         <form className="flex-1" onSubmit={handleSubmit}>
//           <input
//             className="border p-3 rounded w-full mb-4"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//           />

//           <input
//             className="border p-3 rounded w-full mb-4"
//             placeholder="Price"
//             type="number"
//             value={price}
//             onChange={(e) => setPrice(e.target.value)}
//           />

//           <input
//             className="border p-3 rounded w-full mb-4"
//             placeholder="Stock"
//             type="number"
//             value={stock}
//             onChange={(e) => setStock(e.target.value)}
//           />

//           <input
//             className="border p-3 rounded w-full mb-4"
//             placeholder="Category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//           />

//           <textarea
//             className="border p-3 rounded w-full mb-4"
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//           />
//           <label>Image</label>
//           <input
//             type="file"
//             onChange={(e) => {
//               const file = e.target.files?.[0];
//               if (file) setImage(file);
//             }}
//           />

//           <button className="bg-green-600 text-white py-3 px-5 rounded">
//             Create
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }


"use client";

import { useState } from "react";
import api from "../../api/axios"; // make sure axios instance is correct
import { ChevronRight } from "lucide-react";
import Header from "../../components/Header";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState<number | "">(0);
  const [stock, setStock] = useState<number | "">(0);
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());
    formData.append("category", category);
    if (image) formData.append("images", image); // note: your model field is `images`

    try {
      const res = await api.post("/products/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Product created:", res.data);
      alert("Product created successfully!");
    } catch (err: any) {
      console.error("Error creating product:", err.response || err);
      alert("Error creating product");
    }
  };

  return (
    <>
      <Header />
      <div className="m-5 p-10 bg-gray-100">
        <header className="flex sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <h1 className="flex text-3xl font-bold text-gray-800">
            <span className="flex text-gray-400">
              Admin Dashboard <ChevronRight size={40} />
            </span>{" "}
            Add Product
          </h1>
        </header>

        <form onSubmit={handleSubmit} className="flex-1">
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border p-3 rounded w-full mb-4"
            required
          />

          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border p-3 rounded w-full mb-4"
            required
          />

          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="border p-3 rounded w-full mb-4"
            required
          />

          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="border p-3 rounded w-full mb-4"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-3 rounded w-full mb-4"
            required
          />

          <label>Image</label>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImage(file);
            }}
            className="mb-4"
          />

          <button
            type="submit"
            className="bg-green-600 text-white py-3 px-5 rounded"
          >
            Create
          </button>
        </form>
      </div>
    </>
  );
}
