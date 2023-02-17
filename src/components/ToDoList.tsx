import { useForm } from "react-hook-form";
import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Categories, categoryListState, categoryState, toDoSelector, toDoState } from "../atoms";
import Category from "./Category";
import CreateToDo from "./CreateToDo";
import ToDo from "./ToDo";

interface IForm {
  categoryNm: string;
}

function ToDoList() {
  //const [toDo, doing, done] = useRecoilValue(toDoSelector);
  const toDos = useRecoilValue(toDoSelector);
  const categoryList = useRecoilValue(categoryListState);
  const [category, setCategory] = useRecoilState(categoryState);
  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as any);
  };
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const setCategoryListState = useSetRecoilState(categoryListState);
  
  const handleValid = ({ categoryNm }: IForm) => {
    setCategoryListState((oldCategory) => [
      ...oldCategory,
      {value: categoryNm,text: categoryNm}
    ]);

  };
  return (
    <div>
      <h1>To Dos</h1>
      <hr />
      <select value={category} onInput={onInput}>
        {categoryList.map((e) => <Category key={e.value} {...e} />)}
      </select>

      <div>
        <input
          {...register("categoryNm", {
            required: "Please write Category Name",
          })}
          placeholder="Write Category Name"
        />
        <button onClick={handleSubmit(handleValid)}>Add Category</button>
      </div>

      <CreateToDo />
      {toDos?.map((toDo) => (
        <ToDo key={toDo.id} {...toDo} />
      ))}
    </div>
  );
}


export default ToDoList;