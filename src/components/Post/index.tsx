import profileImage from "../../resources/saheed-sc.jpg"
import postImage from "../../resources/saheed-sc.jpg"
import {FaComment, FaHeart, FaRetweet, FaShareAlt} from 'react-icons/fa';
import {useState} from "react";

interface IProps {
}

function Post(props: IProps) {
    const actionItems = [
        { icon: <FaComment className="w-4 h-4" />, count: 45, isClicked: false },
        { icon: <FaHeart className="w-4 h-4" />, count: 24, isClicked: false },
        { icon: <FaShareAlt className="w-4 h-4" />, count: 20, isClicked: false },
        { icon: <FaRetweet className="w-4 h-4" />, count: 7, isClicked: false },
    ];

    const [items, setItems] = useState(actionItems);

    const handleItemClick = (index: number) => {
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

    return(
       <div className="flex justify-center mt-10">
           <div className="w-12 h-12 rounded-full overflow-hidden mr-5">
               <img className="w-full h-full object-cover" src={profileImage} alt="" />
           </div>
           <div className="max-w-screen-sm">
               <div >
                   <p >
                   <span className="font-bold mr-1">Saheed Ajayi</span>
                   <span className="">@saheedajayi</span>
                   <span> &middot; 5h</span>
                   </p>
                   <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                       At cumque, enim eveniet labore nam officiis repellendus?
                       Ab at culpa illo ipsa, neque odio omnis, quae quibusdam reprehenderit rerum,
                       suscipit tenetur?
                   </p>
               </div>
               <div>
                   <img className="w-full h-full object-cover mt-3 mb-3 rounded-2xl" src={postImage} alt=""/>
               </div>
               <div className="flex">
                   {items.map((item, index) => (
                       <div
                           className={`flex items-center mr-20 cursor-pointer ${
                               item.isClicked ? (index === 1 ? 'text-red-500' : 'text-blue-500') : ''
                           }`}
                           onClick={() => handleItemClick(index)}
                       >
                           {item.icon}
                           <p className="ml-1 w-4">{item.count}</p>
                       </div>
                   ))}
               </div>

           </div>
       </div>
    )
}
export default Post