type EditableFieldProps = {
  label: string
  value: string
  onChange: (value: string) => void
  multiline?: boolean
}

export function EditableField({
  label,
  value,
  onChange,
  multiline = false,
}: EditableFieldProps) {
  return (
    <label className="block">
      <span className="mb-1 block text-sm font-medium text-gray-700">
        {label}
      </span>

      {multiline ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
          rows={3}
        />
      ) : (
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full rounded-lg border px-3 py-2"
        />
      )}
    </label>
  )
}