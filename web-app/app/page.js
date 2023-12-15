import MagicContainer from "./magic";

const Content = () => (
  <div>
    <h1 className="m-0 p-0 text-4xl sm:text-7xl">JAGNTA</h1>
    <p className="lead m-0 p-0">Just another generic notetaking app.</p>
    <p>Built with MySQL, Next.js and NextUI</p>
  </div>
);

export default function Home() {
  return (
    <main className="flex flex-col grow items-center justify-between">
      <div className="text-center w-full flex grow">
        <MagicContainer>
          <Content />
        </MagicContainer>
      </div>
    </main>
  );
}
