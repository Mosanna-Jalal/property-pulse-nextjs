"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import markMessageAsRead from "@/app/actions/markMessageAsRead";
const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.Read);
  const handleReadClick = async () => {
    const read = await markMessageAsRead(message._id);
    setIsRead(read);
    toast.success(`Message marked as ${read ? "read" : "new"}`);
  };
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
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        onClick={handleReadClick}
        className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
      >
        {isRead ? "Mark as New" : "Mark as Read"}
      </button>
      <button className="ml-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md">
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
