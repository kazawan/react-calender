import { Button } from "antd";

const Navi = () => {
    return (
        <div className=" 
        w-full
      
        px-2
        [&_>Button]:mr-2 
        [&_>Button]:w-16
        [&_>Button]:h-8
        [&_>Button]:bg-blue-500
        [&_>Button]:text-white
        [&_>Button]:rounded-md
        [&_>Button]:hover:bg-blue-700
        [&_>Button]:focus:outline-none
        [&_>Button]:focus:ring
        [&_>Button]:focus:ring-blue-300
        [&_>Button]:focus:ring-offset-2
        [&_>Button]:focus:ring-offset-blue-500
        flex flex-row justify-start items-center   
         flex-nowrap
        
        ">
            <div
            >
                <h1 className="text-white text-[2rem] mr-2 font-bold">kazawan</h1>
            </div>
            <Button >Home</Button>
            <Button >About</Button>
            <Button >Todo</Button>
            <Button >news</Button>
            
        </div>
    );
}

export default Navi;