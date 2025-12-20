export default function Contact() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-20">
      <h1 className="text-3xl font-semibold">Contact</h1>

      <form className="mt-8 max-w-md grid gap-4">
        <input
          placeholder="Name"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
        />
        <input
          placeholder="Phone"
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
        />
        <textarea
          placeholder="Message"
          rows={4}
          className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm outline-none"
        />

        <button className="rounded-xl bg-white px-4 py-3 text-sm font-semibold text-zinc-900 hover:opacity-90">
          Submit
        </button>
      </form>
    </div>
  );
}
