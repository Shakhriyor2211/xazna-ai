import { DynamicLink } from "fumadocs-core/dynamic-link";

export default function HomePage() {
  return (
    <main
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        textAlign: "center",
        justifyContent: "center",
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          fontWeight: "bold",
          marginBottom: "1rem",
        }}
      >
        Hello World
      </h1>
      <p>
        You can open&nbsp;
        <DynamicLink
          href="/[lang]/docs/v1.0/introduction"
          style={{
            fontWeight: "600",
            textDecoration: "underline",
          }}
        >
          /docs
        </DynamicLink>
        &nbsp;and see the documentation.
      </p>
    </main>
  );
}
