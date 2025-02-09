// "use client"

// import App from "../frontend/src/App"

// export default function SyntheticV0PageForDeployment() {
//   return <App />
// }


// // File: app/page.tsx
// "use client";

// import dynamic from 'next/dynamic';

// const App = dynamic(() => import("../frontend/src/App"), {
//   ssr: false,
// });

// export default function SyntheticV0PageForDeployment() {
//   return (
//     <div className="min-h-screen">
//       <App />
//     </div>
//   );
// }

// // File: app/page.tsx
// "use client";

// import dynamic from "next/dynamic";

// const App = dynamic(() => import("../frontend/src/App"), {
//   ssr: false,
// });

// export default function SyntheticV0PageForDeployment() {
//   return (
//     <div className="flex min-h-screen items-center justify-center bg-gray-100 p-6">
//       <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-6">
//         <App />
//       </div>
//     </div>
//   );
// }

"use client";

import dynamic from "next/dynamic";

const App = dynamic(() => import("../frontend/src/App"), {
  ssr: false,
});

export default function Page() {
  return <App />;
}