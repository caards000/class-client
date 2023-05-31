import profileImage from "../../assets/resources/saheed-sc.jpg";
import postImage from "../../assets/resources/saheed-sc.jpg";
import { FaComment, FaHeart, FaRetweet, FaShareAlt } from 'react-icons/fa';
import { useState } from "react";
import {Link, useNavigate} from "react-router-dom";

interface IProps {}

function Post(props: IProps) {

    const navigate = useNavigate();

    const actionItems = [
        { icon: <FaComment className="w-4 h-4" />, count: 5, isClicked: false },
        { icon: <FaHeart className="w-4 h-4" />, count: 24, isClicked: false },
        { icon: <FaShareAlt className="w-4 h-4" />, count: 20, isClicked: false },
        { icon: <FaRetweet className="w-4 h-4" />, count: 7, isClicked: false },
    ];

    const [items, setItems] = useState(actionItems);

    const handleItemClick = (index: number) => {
        if (index === 0) {
            navigate("/comment")
            return;
        }

        setItems((prevItems) => {
            return prevItems.map((item, i) => {
                if (i === index) {
                    if (item.isClicked) {
                        return { ...item, count: item.count - 1, isClicked: false };
                    } else {
                        return { ...item, count: item.count + 1, isClicked: true };
                    }
                }
                return item;
            });
        });
    };

    return (
        <div className="flex justify-center">
                <div className="w-12 h-12 rounded-full overflow-hidden mr-5">
                    <img className="w-full h-full object-cover" src={profileImage} alt="" />
                </div>
                <div className="flex-1">
                    <div>
                        <p className="typo-body text-slate-800">
                            <span className="font-bold mr-1">Saheed Ajayi</span>
                            <span>@saheedajayi</span>
                            <span> &middot; 5h</span>
                        </p>
                        <p className="text-slate-600 mt-2">
                            Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                            At cumque, enim eveniet labore nam officiis repellendus?
                            Ab at culpa illo ipsa, neque odio omnis, quae quibusdam reprehenderit rerum,
                            suscipit tenetur?
                        </p>
                    </div>
                    <div>
                        <img
                            className="w-full aspect-video object-cover object-center mt-3 mb-3 rounded-md"
                            src={postImage}
                            alt=""
                        />
                    </div>
                    <div className="flex">
                        {items.map((item, index) => (
                            <div
                                key={index}
                                className={`flex items-center mr-20 cursor-pointer ${
                                    item.isClicked ? (index === 1 ? 'text-red-500' : 'text-blue-500') : ''
                                }`}
                                onClick={() => handleItemClick(index)}
                            >
                                {item.icon}
                                {item.count && <p className={`ml-1 ${index === 0 ? 'mr-1' : ''} w-4`}>{item.count}</p>}

                            </div>
                        ))}
                    </div>
                </div>
        </div>
    );
}

export default Post;
