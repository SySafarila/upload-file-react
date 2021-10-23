import { useForm } from "react-hook-form";
import axios from "axios";
import { useState } from "react";

export default function Home() {
  const [uploaded, setUploaded] = useState(0);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("name", "asdf");

    // return console.log(formData);

    axios
      .post("http://api-laravel-8.test/api/notes/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer 123123",
        },
        onUploadProgress: (progressEvent) => {
          console.log(
            `Progress : ${Math.round(
              (progressEvent.loaded / progressEvent.total) * 100
            )}%`
          );
          setUploaded(
            Math.round((progressEvent.loaded / progressEvent.total) * 100)
          );
        },
      })
      .then((res) => {
        console.log(res);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          type="file"
          {...register("image", { required: true })}
          // multiple={true}
          name="image"
        />
        <button type="submit">Send</button>
      </form>
      <div
        style={{ background: "green", height: "1rem", width: `${uploaded}%`, transition: 'width ease-in-out' }}
      ></div>
    </div>
  );
}
