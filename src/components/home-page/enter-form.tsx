"use client";

type EnterFormProps = {
  onSubmit: (name: string) => void
}

export default function EnterForm({ onSubmit }: EnterFormProps) {
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget as HTMLFormElement);
        const name = formData.get("name") as string;
        onSubmit(name);
      }}
      className="bg-gray-500 bg-opacity-50 p-6 rounded shadow-md flex flex-col items-center"
    >
      <label htmlFor="name"
      className="text-lg"
      >Name</label>
      <input id="name" type="text" required name="name"
      className="border border-black rounded px-2 py-1 mb-4 focus:ring-2 focus:ring-red-700 focus:outline-none transition"
      />
      <button type="submit"
      className="border border-black rounded px-4 py-2 hover:bg-red-700 hover:text-white transition"
      >Enter house</button>
    </form>
  );
}
