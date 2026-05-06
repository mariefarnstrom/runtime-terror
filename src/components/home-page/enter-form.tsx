"use client";

export default function EnterForm() {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <label htmlFor="1">Name</label>
      <input id="1" type="text" />
      <button type="submit">Enter house</button>
    </form>
  );
}
