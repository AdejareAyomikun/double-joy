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
// version 1.0

// "use client";

// import { useState } from "react";
// import api from "../../api/axios"; // make sure axios instance is correct
// import { ChevronRight } from "lucide-react";
// import Header from "../../components/Header";

// export default function AddProduct() {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [category, setCategory] = useState("");
//   const [price, setPrice] = useState<number | "">(0);
//   const [stock, setStock] = useState<number | "">(0);
//   const [image, setImage] = useState<File | null>(null);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("price", price.toString());
//     formData.append("stock", stock.toString());
//     formData.append("category", category);
//     if (image) formData.append("image", image); // note: your model field is `images`

//     try {
//       const res = await api.post("/products/", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//         },
//       });
//       console.log("Product created:", res.data);
//       alert("Product created successfully!");
//     } catch (err: any) {
//       console.error("Error creating product:", err.response || err);
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

//         <form onSubmit={handleSubmit} className="flex-1">
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="border p-3 rounded w-full mb-4"
//             required
//           />

//           <input
//             type="number"
//             placeholder="Price"
//             value={price}
//             onChange={(e) => setPrice(Number(e.target.value))}
//             className="border p-3 rounded w-full mb-4"
//             required
//           />

//           <input
//             type="number"
//             placeholder="Stock"
//             value={stock}
//             onChange={(e) => setStock(Number(e.target.value))}
//             className="border p-3 rounded w-full mb-4"
//             required
//           />

//           <input
//             type="text"
//             placeholder="Category"
//             value={category}
//             onChange={(e) => setCategory(e.target.value)}
//             className="border p-3 rounded w-full mb-4"
//             required
//           />

//           <textarea
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="border p-3 rounded w-full mb-4"
//             required
//           />

//           <label>Image</label>
//           <input
//             type="file"
//             onChange={(e) => {
//               const file = e.target.files?.[0];
//               if (file) setImage(file);
//             }}
//             className="mb-4"
//           />

//           <button
//             type="submit"
//             className="bg-green-600 text-white py-3 px-5 rounded"
//           >
//             Create
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }
// version 2.0

// "use client";

// import { useEffect, useState } from "react";
// import api from "../../api/axios"; // your axios instance
// import { ChevronRight } from "lucide-react";
// import Header from "../../components/Header";

// interface Category {
//   id: number;
//   name: string;
//   slug: string;
// }

// export default function AddProduct() {
//   const [name, setName] = useState("");
//   const [description, setDescription] = useState("");
//   const [categoryId, setCategoryId] = useState<number | "">("");
//   const [price, setPrice] = useState<number | "">("");
//   const [stock, setStock] = useState<number | "">("");
//   const [image, setImage] = useState<File | null>(null);
//   const [categories, setCategories] = useState<Category[]>([]);

//   // Fetch categories from backend
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await api.get("/categories/", {
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//           },
//         });
//         setCategories(res.data);
//       } catch (err) {
//         console.error("Error fetching categories", err);
//       }
//     };
//     fetchCategories();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!categoryId) {
//       alert("Please select a category!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("name", name);
//     formData.append("description", description);
//     formData.append("price", price.toString());
//     formData.append("stock", stock.toString());
//     formData.append("category", categoryId.toString());
//     if (image) formData.append("image", image);7

//     try {
//       const res = await api.post("/products/", formData, {
//         headers: {
//           "Content-Type": "multipart/form-data",
//           Authorization: `Bearer ${localStorage.getItem("access_token")}`,
//         },
//       });
//       console.log("Product created:", res.data);
//       alert("Product created successfully!");
//       // Reset form
//       setName("");
//       setDescription("");
//       setCategoryId("");
//       setPrice("");
//       setStock("");
//       setImage(null);
//     } catch (err: any) {
//       console.error("Error creating product:", err.response || err);
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

//         <form onSubmit={handleSubmit} className="flex-1">
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="border p-3 rounded w-full mb-4"
//             required
//           />

//           <input
//             type="number"
//             placeholder="Price"
//             value={price}
//             onChange={(e) => setPrice(Number(e.target.value))}
//             className="border p-3 rounded w-full mb-4"
//             required
//           />

//           <input
//             type="number"
//             placeholder="Stock"
//             value={stock}
//             onChange={(e) => setStock(Number(e.target.value))}
//             className="border p-3 rounded w-full mb-4"
//             required
//           />

//           <select
//             value={categoryId}
//             onChange={(e) => setCategoryId(Number(e.target.value))}
//             className="border p-3 rounded w-full mb-4"
//             required
//           >
//             <option value="">Select Category</option>
//             {categories.map((cat) => (
//               <option key={cat.id} value={cat.id}>
//                 {cat.name}
//               </option>
//             ))}
//           </select>

//           <textarea
//             placeholder="Description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             className="border p-3 rounded w-full mb-4"
//             required
//           />

//           <label>Image</label>
//           <input
//             type="file"
//             onChange={(e) => {
//               const file = e.target.files?.[0];
//               if (file) setImage(file);
//             }}
//             className="mb-4"
//             accept="image/*"
//             required
//           />

//           <button
//             type="submit"
//             className="bg-green-600 text-white py-3 px-5 rounded"
//           >
//             Create
//           </button>
//         </form>
//       </div>
//     </>
//   );
// }
// version 3.0 with category fetch and selection

"use client";

import { useState, useEffect } from "react";
import api from "@/api/axios";
import { getCategories } from "@/api/products";
import { ChevronRight } from "lucide-react";
import Header from "../../components/Header";
import { Category } from "@/types/admin";

export default function AddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<number | "">("");
  const [price, setPrice] = useState<number | "">(0);
  const [stock, setStock] = useState<number | "">(0);
  const [image, setImage] = useState<File | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await getCategories();
        setCategories(data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching categories:", err);
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!category) {
      alert("Please select a category");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());
    formData.append("category", category.toString()); // must be the category ID
    if (image) formData.append("image", image);

    try {
      const res = await api.post("/products/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Product created:", res.data);
      alert("Product created successfully!");
      // reset form
      setName("");
      setDescription("");
      setPrice(0);
      setStock(0);
      setCategory("");
      setImage(null);
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
          <label htmlFor="price">Price</label>
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="border p-3 rounded w-full mb-4"
            required
          />
          <label htmlFor="stock">Stock</label>
          <input
            type="number"
            placeholder="Stock"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="border p-3 rounded w-full mb-4"
            required
          />

          {loading ? (
            <p>Loading categories...</p>
          ) : (
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value === "" ? "" : Number(e.target.value))}
              className="border p-3 rounded w-full mb-4"
              required
            >
              <option value="">Select a category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-3 rounded w-full mb-4"
            required
          />

          <label className="block mb-2 text-sm font-medium text-gray-900">
            Image
          </label>
          <input
            type="file"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) setImage(file);
            }}
            className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
          file:bg-blue-100 file:text-blue-700
          hover:file:bg-blue-200 mb-4"
            required
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
