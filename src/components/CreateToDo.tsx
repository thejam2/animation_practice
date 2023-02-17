import { useForm } from "react-hook-form";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { categoryListState, categoryState, toDoState } from "../atoms";

interface IForm {
  toDo: string;
}

function CreateToDo() {
  const setToDos = useSetRecoilState(toDoState);
  const category = useRecoilValue(categoryState);
  const { register, handleSubmit, setValue } = useForm<IForm>();
  const handleValid = ({ toDo }: IForm) => {
    setToDos((oldToDos) => [
      { text: toDo, id: Date.now(), category },
      ...oldToDos,
    ]);
    
    setValue("toDo", "");
  };

  return (
    <>
      <form onSubmit={handleSubmit(handleValid)}>
        <div>
          <input
            {...register("toDo", {
              required: "Please write a To Do",
            })}
            placeholder="Write a to do"
          />
          <button>Add</button>
        </div>
      </form>
    </>
  );
}

export default CreateToDo;