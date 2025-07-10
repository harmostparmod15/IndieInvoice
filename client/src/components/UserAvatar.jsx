import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserCircle } from "lucide-react";

export default function UserAvatar() {
  const user = useSelector((state) => state.user.user);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/update-profile");
  };

  return (
    <div
      onClick={handleClick}
      className="cursor-pointer  hover:text-xl transition-all duration-300 flex items-center gap-2 px-3 py-2  "
    >
      {user?.logoUrl ? (
        // <img
        //   src={user.logoUrl}
        //   alt="Avatar"
        //   className="w-8 h-8 rounded-full object-cover"
        // />
        <img
          src={
            user?.logoUrl ||
            "https://api.dicebear.com/6.x/initials/svg?seed=User"
          }
          alt="Avatar"
          className=" w-10 h-10 rounded-full object-cover transition-all duration-500"
        />
      ) : (
        <UserCircle className="w-8 h-8 text-gray-600" />
      )}
      <span className="hidden md:inline text-md capitalize  font-bold text-gray-100  ">
        {user?.name?.split(" ")[0]}
      </span>
    </div>
  );
}
