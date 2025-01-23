import React from 'react'


const AddEditClimbs = () => {

    const vgrades = [
        { value: 'v0', label: 'V0' },
        { value: 'v1', label: 'V1' },
        { value: 'v2', label: 'V2' },
        { value: 'v3', label: 'V3' },
        { value: 'v4', label: 'V4' },
        { value: 'v5', label: 'V5' },
        { value: 'v6', label: 'V6' },
        { value: 'v7', label: 'V7' },
        { value: 'v8', label: 'V8' },
        { value: 'v9', label: 'V9' },
        { value: 'v10', label: 'V10' },
        { value: 'v11', label: 'V11' },
        { value: 'v12', label: 'V12' },
        { value: 'v13', label: 'V13' },
        { value: 'v14', label: 'V14' },
        { value: 'v15', label: 'V15' },
        { value: 'v16', label: 'V16' },
        { value: 'v17', label: 'V17' }
      ];

  return (
    <div>
      <div className="flex flex-col gap-2">
        <label className="input-label">TITLE</label>
        <input 
            type="text"
            className="text-2xl text-slate-950 outline-none"
            placeholder="My First Climb"
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">DESCRIPTION</label>
        <textarea
            type="text"
            className="text-sm text-slate-950 outline-none bg-slate-50 p-2 rounded"
            placeholder="Easiest slab climb"
            rows={5}
        />
      </div>

      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">V-SCALE</label>
        <select className="py-1 px-2 text-sm border rounded-md">
          {vgrades.map((vgrade) => (
            <option value={vgrade.value}>
                {vgrade.label}
            </option>
          ))}
        </select>
      </div>
    
      <div className="flex flex-col gap-2 mt-4">
        <label className="input-label">LINK</label>
        <input 
            type="text"
            className="text-xm text-slate-950 outline-none"
            placeholder="https://www.youtube.com/watch?v=ooFQ4OMFdSI"
        />
      </div>
    
    <button className="btn-primary font-medium mt-5 p-3" onClick={() => {}} >
        ADD
    </button>

    </div>
  )
}

export default AddEditClimbs
