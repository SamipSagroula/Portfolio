from __future__ import annotations

from pathlib import Path
from typing import Dict, Any, List

from .utils import load_json, save_json, utc_now_iso


class ModelRegistry:
    def __init__(self, path: str = "artifacts/model_registry.json") -> None:
        self.path = path

    def _load(self) -> Dict[str, Any]:
        return load_json(self.path) or {"models": []}

    def register(self, name: str, version: str, artifact_path: str, metrics: Dict[str, Any]) -> None:
        data = self._load()
        entry = {
            "name": name,
            "version": version,
            "artifact_path": artifact_path,
            "metrics": metrics,
            "created_at": utc_now_iso(),
        }
        data["models"].append(entry)
        save_json(data, self.path)

    def list_models(self) -> List[Dict[str, Any]]:
        return self._load().get("models", [])

