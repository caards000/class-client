import React from 'react';
import Button from "../../components/Button";
import {useAppDispatch, useAppSelector} from "../../redux/hooks";
import {counterActions} from "../../redux/slices/counterSlice";
import Input from "../../components/Input";

interface IProps {
}

function HomePage(props: IProps) {
  const {count, fullName} = useAppSelector(state => state.counter);
  const dispatch = useAppDispatch();

  return (
    <div>
      <h1>Home page</h1>
      <h1>Count: {count}</h1>
      <h1>Full name: {fullName}</h1>
      <div className="flex gap-4">
        <Button onClick={()=>{
          dispatch(counterActions.incrementCount())
        }}>Increment</Button>
        <Button onClick={()=>{
          dispatch(counterActions.decrementCount())
        }}>Decrement</Button>

        <Input onChange={(e)=>{
          dispatch(counterActions.setName(e.target.value))
        }} />
      </div>
    </div>
  );
}

export default HomePage;