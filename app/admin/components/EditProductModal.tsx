"use client";

import { useState } from "react";

interface Product {
  id: number;
  name: string;
  price: number;
  stock: number;
  category: number;
}

interface Props {
  open: boolean;
  product: Product | null;
  categories: any[];
  onClose: () => void;
  onSave: (data: FormData) => Promise<void>;
  className?: string;
}

export default function EditProductModal({
  open,
  product,
  categories,
  onClose,
  onSave,
}: Props) {
  const [name, setName] = useState(product?.name || "");
  const [price, setPrice] = useState(product?.price || 0);
  const [stock, setStock] = useState(product?.stock || 0);
  const [category, setCategory] = useState(product?.category || "");
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  if (!open || !product) return null;

  const handleSubmit = async () => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());
    formData.append("category", category.toString());
    if (image) formData.append("image", image);

    await onSave(formData);
    setLoading(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">Edit Product</h2>

        <div className="space-y-3">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
            placeholder="Product name"
          />
          <label htmlFor="">Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(Number(e.target.value))}
            className="w-full border p-2 rounded"
            placeholder="Price"
          />
          <label htmlFor="">Stock</label>
          <input
            type="number"
            value={stock}
            onChange={(e) => setStock(Number(e.target.value))}
            className="w-full border p-2 rounded"
            placeholder="Stock"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border p-2 rounded"
          >
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>

          <input
            type="file"
            onChange={(e) => setImage(e.target.files?.[0] || null)}
          />
        </div>

        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onClose} className="border px-4 py-2 rounded">
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            {loading ? "Saving..." : "Save Changes"}
          </button>
        </div>
      </div>
    </div>
  );
}
