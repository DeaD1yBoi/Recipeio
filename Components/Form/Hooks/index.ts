import { UseStatePostProps } from "@/types";
import { isHaveLongWord } from "@/utils";


export default function useFormHooks(props: UseStatePostProps) {
    const { post, setPost } = props;


    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return ;
      }

      setPost({...post, image: e.target.files[0]});
    };

    const onClick = (e: React.MouseEvent<HTMLInputElement>) => {
      e.currentTarget.value = "";
    };

    const handleAddName = (e : React.ChangeEvent<HTMLInputElement>) => {
        if (isHaveLongWord(e.target.value)) {
          return alert("You can not use word longer than 50 characters");
        }
        setPost({
          ...post,
          nameStr: e.target.value.replace(/[.,\/#!$%^&*;:{}=\-_`~()]/g, ""),
        });
      };
    return {handleAddName, onFileChange, onClick};
}
