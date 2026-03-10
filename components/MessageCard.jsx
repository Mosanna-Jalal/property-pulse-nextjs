"use client";
import { useMemo, useState } from "react";
import { toast } from "react-toastify";
import markMessageAsRead from "@/app/actions/markMessageAsRead";
import deleteMessage from "@/app/actions/deleteMessage";
import { useGlobalContext } from "@/context/GlobalContext";

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(Boolean(message.read));
  const [isDeleted, setIsDeleted] = useState(false);
  const { setUnreadCount } = useGlobalContext();

  const formattedReceivedAt = useMemo(() => {
    const date = new Date(message.createdAt);
    return new Intl.DateTimeFormat("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
      timeZone: "Asia/Kolkata",
    }).format(date);
  }, [message.createdAt]);

  const handleReadClick = async () => {
    const read = await markMessageAsRead(message._id);
    setIsRead(read);
    setUnreadCount((prevCount) => Math.max(0, prevCount + (read ? -1 : 1)));
    toast.success(`Message marked as ${read ? "Read" : "New"}`);
  };

  const handleDeleteClick = async () => {
    try {
      await deleteMessage(message._id);
      setIsDeleted(true);
      if (!isRead) {
        setUnreadCount((prevCount) => Math.max(0, prevCount - 1));
      }
      toast.success("Message deleted successfully");
    } catch (error) {
      toast.error("Failed to delete message");
    }
  };
  if (isDeleted) {
    return <p>Deleted Message</p>;
  }
  return (
    <div className="relative bg-white shadow-md border border-gray-200 p-4 rounded-md">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded-full">
          New
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Enquiry:</span>{" "}
        {message.property.name}
      </h2>
      <p className="mb-2 text-gray-700"> {message.body}</p>
      <ul className="mt-4">
        <li>
          <strong>Reply Email:</strong>{" "}
          <a
            href={`mailto:${message.email}`}
            className="text-blue-500 hover:underline"
          >
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{" "}
          <a
            href={`tel:${message.phone}`}
            className="text-blue-500 hover:underline"
          >
            {message.phone}
          </a>
        </li>
        <li>
          <strong> Received: </strong>
          {formattedReceivedAt} IST
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        {isRead ? "Mark as New" : "Mark as Read"}
      </button>
      <button
        onClick={handleDeleteClick}
        className="ml-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
