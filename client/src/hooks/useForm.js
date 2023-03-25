import { useState } from "react";

export const useForm = (initialGenrs, initialRecordValues) =>{
    const [recordValues, setRecordValues] = useState(initialRecordValues);
    const [genres, setGenres] = useState(initialGenrs);

    const onChangeHandler = (e) => {
        setRecordValues((state) => ({ ...state, [e.target.name]: e.target.value }));
      };
    
      const onGenresChange = (e) => {
        setGenres((state) => ({ ...state, [e.target.id]: e.target.checked }));
      };

      return {
        recordValues,
        genres,
        onChangeHandler,
        onGenresChange,
        setRecordValues,
        setGenres
      }


}