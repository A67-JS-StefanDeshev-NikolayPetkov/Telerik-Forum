//Misc imports
import "./CreatePostForm.css";

//Dependency imports
import { useRef, useEffect } from "react";

//Component imports
import SubmitButton from "../../SubmitButton/SubmitButton";
import FieldError from "../FieldError/FieldError";

function CreatePostForm({
  handleInput,
  handleSubmit,
  formData,
  errors,
  label,
}) {
  const paragraphRef = useRef(null);
  useEffect(() => {
    console.log(formData);
  }, []);

  useEffect(() => {
    if (errors.message) paragraphRef.current.focus();
  }, [errors.message]);

  return (
    <form
      className="post-form"
      onSubmit={handleSubmit}
    >
      <div>
        <label htmlFor="post-title">Title</label>
        <input
          className="post-input"
          type="text"
          id="post-title"
          name="postTitle"
          required
          placeholder="Enter your post title"
          value={formData.postTitle}
          onChange={(e) => {
            handleInput(e.target);
          }}
        />
        {errors.postTitle && <FieldError label={errors.postTitle}></FieldError>}
      </div>

      <div>
        <label htmlFor="post-body">Body</label>
        <textarea
          className="post-input"
          type="text"
          id="post-body"
          name="postBody"
          required
          placeholder="Enter your post's body"
          value={formData.postBody}
          onChange={(e) => {
            handleInput(e.target);
          }}
        />
        {errors.postBody && <FieldError label={errors.postBody}></FieldError>}
      </div>

      {errors.message && (
        <div autoFocus>
          <p
            ref={paragraphRef}
            tabIndex={-1}
          >
            {errors.message}
          </p>
        </div>
      )}

      <SubmitButton label={label}></SubmitButton>
    </form>
  );
}

export default CreatePostForm;
