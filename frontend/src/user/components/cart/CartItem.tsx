import React from "react";

interface CartItemProps {
  id: string;
  name: string;
  picture: string;
  selectedSize: string;
  quantity: number;
  price: number;
  description?: string;
  onQuantityChange?: (quantity: number) => void;
  onRemove?: () => void;
}

const CartItem: React.FC<CartItemProps> = ({
  id,
  name,
  picture,
  selectedSize,
  quantity,
  price,
  description,
  onQuantityChange,
  onRemove,
}) => {
  return (
    <div
      key={`${id}-${selectedSize}`}
      className="flex overflow-hidden relative border-4 border-blue-300 rounded-lg shadow-lg"
    >
      <div className="relative h-48">
        <img
          className="m-5 max-w-28 object-contain"
          src={process.env.NEXT_PUBLIC_IMAGE_URL + picture}
          alt={name}
        />
      </div>
      <div className="p-6 flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold mb-2">{name}</h2>
          {description && (
            <p className="text-gray-700 w-9/12 line-clamp-3">{description}</p>
          )}

          <div className="flex mt-5 items-center gap-6">
            <p className="text-gray-700">
              Taille: <span className="underline">{selectedSize}</span>
            </p>
            <div className="flex items-center">
              <span className="mr-2">Quantité : {quantity}</span>
              {onQuantityChange && (
                <select
                  value={quantity}
                  onChange={(e) => onQuantityChange(parseInt(e.target.value))}
                  className="px-2 py-1 border rounded"
                >
                  {[1, 2, 3, 4, 5].map((q) => (
                    <option key={q} value={q}>
                      {q}
                    </option>
                  ))}
                </select>
              )}
            </div>
            {onRemove && (
              <button
                onClick={onRemove}
                className="ml-4 text-red-500 hover:text-red-700"
              >
                supprimer
              </button>
            )}
          </div>
        </div>
        <p className="text-gray-700 text-xl font-bold">{price}€</p>
      </div>
    </div>
  );
};

export default CartItem;
