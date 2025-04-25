"use client"
import { DeleteIcon } from "@/icons";
import { deleteProduct } from "@/libs/actions/product";
import toast from "react-hot-toast";

const DeleteButton = ({id}: {id: string}) => {
  const handleDeleteProduct = async () => {
    await deleteProduct(id);
    toast.success("Product deleted successfully");
    window.location.reload();
  };

  return (
    <button
      onClick={handleDeleteProduct}
      className="text-red-600"
    >
      <DeleteIcon />
    </button>
  );
};

export default DeleteButton;
