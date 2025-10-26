import React from "react";

const Page = () => {
  return (
    <div className="relative h-96 w-full">
      {/* Background gradient + image */}
      <div className="absolute inset-0">
        <img
          className="w-full h-full object-cover mix-blend-overlay"
          src="https://images2.minutemediacdn.com/image/upload/c_crop,x_0,y_69,w_4233,h_2381/c_fill,w_720,ar_16:9,f_auto,q_auto,g_auto/images/GettyImages/mmsport/387/01jwwy704kavc0f6esfy.jpg"
          alt="Example"
        />
        <div className="absolute inset-0 bg-gradient-to-tl from-sky-600/20 to-green-500/"></div>
      </div>

      {/* Text content (on top) */}
      <div className="relative z-10 p-10 flex items-center h-full">
        <h1 className="text-white text-2xl font-semibold leading-relaxed">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Iure
          voluptatibus corporis eum voluptatum quae tempore quasi nisi sint ipsa
          consequuntur neque soluta fugiat quis, unde ut odio deleniti labore
          facilis!
        </h1>
      </div>
    </div>
  );
};

export default Page;
