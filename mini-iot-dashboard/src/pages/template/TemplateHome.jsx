// src/pages/template/TemplateHome.jsx
import { useOutletContext } from "react-router-dom";
export default function TemplateHome() {
  const { template } = useOutletContext();
  const next = [
    "Configure template",
    "Set Up Datastreams",
    "Set up the Web Dashboard",
    "Add first Device",
  ];
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Home</h1>
      <p className="text-sm text-gray-600 mb-3">What’s next?</p>
      <ul className="space-y-2">
        {next.map(x => (
          <li key={x} className="flex items-center gap-3">
            <span className="h-4 w-4 rounded-full border" />
            <button className="text-emerald-700 hover:underline">{x}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
