"use client";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  productName: string;
}

export default function DeleteProductModal({
  open,
  onClose,
  onConfirm,
  productName,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-3 text-red-600">
          Delete Product
        </h2>

        <p className="text-gray-700 mb-6">
          Are you sure you want to delete{" "}
          <span className="font-semibold">{productName}</span>?  
          This action cannot be undone.
        </p>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded border"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
