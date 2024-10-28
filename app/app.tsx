import { Icon } from "@app/components/icon/icon";

export function App() {
  return (
    <div className="m-4 flex h-screen w-screen flex-col items-center justify-center gap-4">
      <h1 className="text-3xl font-bold">Hello, World!</h1>
      <h2 className="text-xl">Welcome to <pre className="inline font-mono font-bold">ts-boilerplate</pre></h2>
      <Icon name="hola" />
    </div>
  );
}
