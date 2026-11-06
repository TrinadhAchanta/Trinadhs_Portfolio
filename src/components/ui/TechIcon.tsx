import { siDocker, siGit, siHuggingface, siJupyter, siKeras, siLangchain, siMlflow, siMongodb, siMysql, siNumpy, siOpenai, siPandas, siPlotly, siPostgresql, siPython, siPytorch, siR, siScikitlearn, siSpacy, siTensorflow } from "simple-icons";

const map: Record<string, { path: string; hex: string }> = {
  Python: siPython, PyTorch: siPytorch, TensorFlow: siTensorflow, "Hugging Face": siHuggingface, LangChain: siLangchain,
  OpenAI: siOpenai, "scikit-learn": siScikitlearn, pandas: siPandas, NumPy: siNumpy, spaCy: siSpacy, Keras: siKeras,
  Docker: siDocker, PostgreSQL: siPostgresql, MongoDB: siMongodb, MySQL: siMysql, MLflow: siMlflow, Plotly: siPlotly,
  Jupyter: siJupyter, Git: siGit, R: siR,
};

export function TechIcon({ name, className = "h-6 w-6", colored = false }: { name: string; className?: string; colored?: boolean }) {
  const icon = map[name];
  if (!icon) return null;
  return (
    <svg viewBox="0 0 24 24" className={className} fill={colored ? `#${icon.hex}` : "currentColor"} aria-hidden>
      <path d={icon.path} />
    </svg>
  );
}
