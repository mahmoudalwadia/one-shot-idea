import React from 'react';
import Link from 'next/link';
import { ArtConfig, ParamSchema } from '../types';
import { STYLES } from '../styles/registry';

interface ControlPanelProps {
  config: ArtConfig;
  onChange: (newConfig: ArtConfig) => void;
  onGenerate: () => void; // Trigger explicit regen (mostly for random buttons)
  onExportPNG: () => void;
  onExportWebM: () => void;
  isRecording: boolean;
}

const ControlPanel: React.FC<ControlPanelProps> = ({
  config,
  onChange,
  onExportPNG,
  onExportWebM,
  isRecording,
}) => {
  const currentDef = STYLES[config.styleId];

  // Helper to update specific params
  const updateParam = (key: string, val: string | number | boolean) => {
    onChange({
      ...config,
      params: { ...config.params, [key]: val }
    });
  };

  const handleStyleChange = (id: string) => {
    const def = STYLES[id];
    // Load default params for the new style
    const defaultParams: Record<string, string | number | boolean> = {};
    Object.entries(def.schema).forEach(([key, schema]) => {
      defaultParams[key] = schema.default;
    });

    onChange({
      ...config,
      styleId: id,
      params: defaultParams
    });
  };

  const getRandomParamValue = (key: string, schema: ParamSchema) => {
    if (schema.type === 'number' && schema.min !== undefined && schema.max !== undefined) {
      let val = schema.min + Math.random() * (schema.max - schema.min);

      // Heuristic: If label implies integer count/index, or step is explicitly set, strict rounding
      const isCount = /count|layer|steps|density|depth|cells/i.test(schema.label || key);

      if (schema.step) {
         val = Math.round(val / schema.step) * schema.step;
      } else if (isCount) {
         val = Math.round(val);
      }

      // Handle float precision issues
      val = parseFloat(val.toPrecision(10));
      return val;
    } else if (schema.type === 'select' && schema.options) {
      return schema.options[Math.floor(Math.random() * schema.options.length)];
    } else if (schema.type === 'boolean') {
      return Math.random() > 0.5;
    }
    return schema.default;
  };

  const handleRandomizeParams = () => {
    if (!currentDef) return;
    const newParams: Record<string, string | number | boolean> = {};
    Object.entries(currentDef.schema).forEach(([key, schema]) => {
      newParams[key] = getRandomParamValue(key, schema);
    });
    // Random seed too
    const newSeed = 'seed-' + Math.floor(Math.random() * 100000);
    onChange({ ...config, seed: newSeed, params: newParams });
  };

  const handleRandomizeStyle = () => {
    const keys = Object.keys(STYLES);
    const randomId = keys[Math.floor(Math.random() * keys.length)];
    const def = STYLES[randomId];

    const newParams: Record<string, string | number | boolean> = {};
    Object.entries(def.schema).forEach(([key, schema]) => {
        newParams[key] = getRandomParamValue(key, schema);
    });

    onChange({
        styleId: randomId,
        seed: 'seed-' + Math.floor(Math.random() * 100000),
        params: newParams
    });
  };

  const applyPreset = (presetName: string) => {
    if (!currentDef || !currentDef.presets[presetName]) return;
    const preset = currentDef.presets[presetName];
    // Merge preset with defaults to ensure completeness
    const defaults: Record<string, string | number | boolean> = {};
    Object.entries(currentDef.schema).forEach(([k, s]) => defaults[k] = s.default);

    onChange({
      ...config,
      params: { ...defaults, ...preset }
    });
  };

  return (
    <div className="w-full md:w-80 bg-neutral-900 border-t md:border-t-0 md:border-r border-neutral-800 h-[45vh] md:h-full overflow-y-auto p-4 flex flex-col gap-6 text-sm shrink-0">

      {/* Header */}
      <div className="flex justify-between items-center md:block">
        <div>
            <h1 className="text-xl font-bold text-white tracking-wider mb-1">STYLE<span className="text-blue-500">_</span>ENGINE</h1>
            <p className="text-neutral-500 text-xs uppercase tracking-widest hidden md:block">Multi-Generator System</p>
        </div>
        {/* Mobile-only controls */}
        <div className="flex gap-2 md:hidden">
          <Link
            href="/"
            className="text-xs bg-neutral-800 border border-neutral-700 px-2 py-1 hover:bg-neutral-700 transition-colors"
          >
            ← Back
          </Link>
          <button onClick={handleRandomizeStyle} className="text-xs bg-neutral-800 border border-neutral-700 px-2 py-1">🎲 RND</button>
        </div>
      </div>

      {/* Global Controls */}
      <div className="space-y-4">
        <div className="space-y-1">
          <label className="text-neutral-400 text-xs font-mono uppercase">Active Style</label>
          <select
            value={config.styleId}
            onChange={(e) => handleStyleChange(e.target.value)}
            className="w-full bg-neutral-800 border border-neutral-700 text-white px-2 py-2 text-xs focus:outline-none focus:border-blue-500"
          >
            {Object.values(STYLES).map(s => (
              <option key={s.id} value={s.id}>{s.name}</option>
            ))}
          </select>
        </div>

        <button
            onClick={handleRandomizeStyle}
            className="w-full bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-2 border border-neutral-700 text-xs uppercase hidden md:block"
          >
            🎲 Randomize Style
          </button>

        <div className="space-y-1">
            <label className="text-neutral-400 text-xs font-mono uppercase">Seed</label>
            <div className="flex gap-2">
            <input
                type="text"
                value={config.seed}
                onChange={(e) => onChange({...config, seed: e.target.value})}
                className="flex-1 bg-neutral-800 border border-neutral-700 text-white px-2 py-1 font-mono text-xs focus:outline-none focus:border-red-500 min-w-0"
            />
            <button
                onClick={() => onChange({...config, seed: 'seed-'+Math.floor(Math.random()*100000)})}
                className="bg-neutral-800 hover:bg-neutral-700 text-white px-3 py-1 border border-neutral-700 text-xs"
            >
                RND
            </button>
            </div>
        </div>
      </div>

      <hr className="border-neutral-800" />

      {/* Style Specific Controls */}
      {currentDef && (
        <div className="space-y-4">
            <div className="flex justify-between items-end">
                <h3 className="text-white font-bold text-xs uppercase">{currentDef.name}</h3>
                <button onClick={handleRandomizeParams} className="text-xs text-blue-400 hover:text-blue-300">Mix Params</button>
            </div>

            {/* Presets */}
            {Object.keys(currentDef.presets).length > 0 && (
                <div className="flex flex-wrap gap-2">
                    {Object.keys(currentDef.presets).map(p => (
                        <button
                            key={p}
                            onClick={() => applyPreset(p)}
                            className="px-2 py-1 bg-neutral-800 border border-neutral-700 text-xs hover:bg-neutral-700 text-neutral-300"
                        >
                            {p}
                        </button>
                    ))}
                </div>
            )}

            <div className="space-y-4 mt-4">
                {Object.entries(currentDef.schema).map(([key, schema]) => (
                    <ControlInput
                        key={key}
                        schema={schema}
                        value={config.params[key]}
                        onChange={(v) => updateParam(key, v)}
                    />
                ))}
            </div>
        </div>
      )}

      <div className="flex-1" />

      {/* Actions */}
      <div className="grid grid-cols-2 gap-2 pb-safe">
        <button
            onClick={onExportPNG}
            className="bg-neutral-800 hover:bg-neutral-700 text-white py-2 border border-neutral-700 text-xs uppercase"
        >
            Save PNG
        </button>
        <button
            onClick={onExportWebM}
            disabled={isRecording}
            className={`py-2 border text-xs uppercase ${
            isRecording
                ? 'bg-red-900/50 border-red-800 text-red-200 animate-pulse'
                : 'bg-neutral-800 hover:bg-neutral-700 text-white border-neutral-700'
            }`}
        >
            {isRecording ? 'REC...' : 'Save WebM'}
        </button>
      </div>
    </div>
  );
};

const ControlInput: React.FC<{
  schema: ParamSchema;
  value: string | number | boolean | undefined;
  onChange: (v: string | number | boolean) => void;
}> = ({ schema, value, onChange }) => {
    // Handle undefined values gracefully during style switches
    const val = value === undefined ? schema.default : value;

    if (schema.type === 'number') {
        return (
            <div className="space-y-1">
                <div className="flex justify-between text-neutral-400 text-xs font-mono">
                <span>{schema.label}</span>
                <span>{typeof val === 'number' ? val.toFixed(2).replace(/\.00$/, '') : val}</span>
                </div>
                <input
                type="range"
                min={schema.min}
                max={schema.max}
                step={schema.step}
                value={typeof val === 'number' ? val : String(val)}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full h-1 bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-white"
                />
            </div>
        );
    }

    if (schema.type === 'select') {
        return (
            <div className="space-y-1">
                <label className="text-neutral-400 text-xs font-mono uppercase">{schema.label}</label>
                <select
                    value={String(val)}
                    onChange={(e) => onChange(e.target.value)}
                    className="w-full bg-neutral-800 border border-neutral-700 text-white px-2 py-2 text-xs focus:outline-none focus:border-blue-500"
                >
                    {schema.options?.map(o => <option key={o} value={o}>{o}</option>)}
                </select>
            </div>
        );
    }

    if (schema.type === 'boolean') {
         return (
             <div className="flex items-center justify-between">
                 <label className="text-neutral-400 text-xs font-mono uppercase">{schema.label}</label>
                 <input
                    type="checkbox"
                    checked={!!val}
                    onChange={(e) => onChange(e.target.checked)}
                    className="accent-blue-500"
                 />
             </div>
         )
    }

    return null;
};

export default ControlPanel;
