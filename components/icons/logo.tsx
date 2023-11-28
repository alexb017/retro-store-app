export default function LogoIcon({ classname }: { classname?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={classname}
      viewBox="0 0 256 256"
    >
      <g fill="currentColor">
        <path
          d="M32 125.73L80 152v54.84l-43.84-24a8 8 0 0 1-4.16-7ZM176 152v54.84l43.84-24a8 8 0 0 0 4.16-7v-50.1ZM124.16 25l-41 22.46L128 72l44.86-24.56L131.84 25a8 8 0 0 0-7.68 0Z"
          opacity=".2"
        />
        <path d="m223.68 66.15l-88-48.15a15.94 15.94 0 0 0-15.36 0l-88 48.18a16 16 0 0 0-8.32 14v95.64a16 16 0 0 0 8.32 14l88 48.17a15.88 15.88 0 0 0 15.36 0l88-48.17a16 16 0 0 0 8.32-14V80.18a16 16 0 0 0-8.32-14.03ZM168 152v50.09l-32 17.52v-86.87l80-43.8v32l-43.84 24A8 8 0 0 0 168 152Zm-84.16-7L40 121V89l80 43.8v86.87l-32-17.58V152a8 8 0 0 0-4.16-7Zm-.7-88.41l41 22.45a8 8 0 0 0 7.68 0l41-22.45l34.48 18.87l-79.3 43.42l-79.34-43.44ZM128 32l28.2 15.44L128 62.89L99.8 47.45ZM40 139.22l32 17.52v36.59l-32-17.51Zm144 54.11v-36.59l32-17.52v36.6Z" />
      </g>
    </svg>
  );
}