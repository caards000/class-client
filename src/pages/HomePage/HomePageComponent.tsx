import React from 'react';
import Post from "../../components/Post";
import Container from "../../components/Container";
import LeftCol from "./LeftCol";

interface IProps {
}

function HomePageComponent(props: IProps) {
  return (
    <Container className="py-5">
      <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,2fr)_minmax(0,1fr)] gap-10">
        <div>
          <LeftCol/>
        </div>
        <div>
          <div className="flex flex-col gap-5">
            {
              [...Array(5)].map((_, index) => (
                <>
                  {index !== 0 &&
                      <div key={`${index}-divider`} className="w-full h-[1px] bg-slate-200"/>}
                  <Post key={index}/>
                </>
              ))
            }
          </div>
        </div>
        <div>c</div>
      </div>
    </Container>
  );
}

export default HomePageComponent;
