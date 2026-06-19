import { PhaserGame } from './game/PhaserGame';

export default function App() {
  return (
    <main className="app-shell">
      <section className="game-frame" aria-label="Dragon Knight playable area">
        <PhaserGame />
      </section>
    </main>
  );
}
