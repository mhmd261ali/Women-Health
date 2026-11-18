import { useCallback, useEffect, useState, type FormEvent } from "react";
import { Link } from "react-router-dom";
import { BLOG_CATEGORIES } from "../lib/blogCategories";
import type { Tip } from "../api-hooks/useGetAllTips";

const STORAGE_KEY = "admin_password";

type FormState = {
  tip: string;
  tip_date: string;
  tip_category: string;
  hook: string;
  tip_description: string;
  instagram_url: string;
};

const emptyForm = (): FormState => ({
  tip: "",
  tip_date: new Date().toISOString().slice(0, 10),
  tip_category: BLOG_CATEGORIES[0],
  hook: "",
  tip_description: "",
  instagram_url: "",
});

export default function AdminPage() {
  const [password, setPassword] = useState(
    () => sessionStorage.getItem(STORAGE_KEY) || "",
  );
  const [passwordInput, setPasswordInput] = useState("");
  const [tips, setTips] = useState<Tip[]>([]);
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const authHeaders = useCallback(
    () => ({
      "Content-Type": "application/json",
      Authorization: `Bearer ${password}`,
    }),
    [password],
  );

  const loadTips = useCallback(async () => {
    if (!password) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/admin/tips", { headers: authHeaders() });
      if (res.status === 401) {
        sessionStorage.removeItem(STORAGE_KEY);
        setPassword("");
        setError("كلمة المرور غير صحيحة");
        return;
      }
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = (await res.json()) as Tip[];
      setTips(data);
    } catch {
      setError("تعذر تحميل النصائح — تأكدي من DATABASE_URL");
    } finally {
      setLoading(false);
    }
  }, [authHeaders, password]);

  useEffect(() => {
    void loadTips();
  }, [loadTips]);

  const login = (e: FormEvent) => {
    e.preventDefault();
    const value = passwordInput.trim();
    if (!value) return;
    sessionStorage.setItem(STORAGE_KEY, value);
    setPassword(value);
    setPasswordInput("");
    setError(null);
  };

  const logout = () => {
    sessionStorage.removeItem(STORAGE_KEY);
    setPassword("");
    setTips([]);
  };

  const startEdit = (tip: Tip) => {
    setEditingId(tip._id);
    setForm({
      tip: tip.tip || "",
      tip_date: tip.tip_date || "",
      tip_category: tip.tip_category || BLOG_CATEGORIES[0],
      hook: tip.hook || "",
      tip_description: tip.tip_description || "",
      instagram_url: tip.instagram_url || "",
    });
    setMessage(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setEditingId(null);
    setForm(emptyForm());
  };

  const save = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.tip.trim()) {
      setError("العنوان مطلوب");
      return;
    }
    setLoading(true);
    setError(null);
    setMessage(null);
    try {
      const res = await fetch(
        editingId
          ? `/api/admin/tips?id=${encodeURIComponent(editingId)}`
          : "/api/admin/tips",
        {
          method: editingId ? "PUT" : "POST",
          headers: authHeaders(),
          body: JSON.stringify(form),
        },
      );
      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || `HTTP ${res.status}`);
      }
      setMessage(editingId ? "تم التحديث" : "تمت الإضافة");
      resetForm();
      await loadTips();
    } catch (err) {
      setError(err instanceof Error ? err.message : "فشل الحفظ");
    } finally {
      setLoading(false);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("حذف هذه النصيحة؟")) return;
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(`/api/admin/tips?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
        headers: authHeaders(),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      if (editingId === id) resetForm();
      await loadTips();
    } catch {
      setError("فشل الحذف");
    } finally {
      setLoading(false);
    }
  };

  const field =
    "w-full rounded-xl border border-cream-300 bg-white px-3 py-2.5 text-sage-800 focus:border-coral-400 focus:outline-none focus:ring-2 focus:ring-coral-200";

  if (!password) {
    return (
      <div
        className="flex min-h-svh items-center justify-center px-4"
        style={{ background: "linear-gradient(180deg, #FAF0EC 0%, #F4F6F3 100%)" }}
        dir="rtl"
      >
        <form
          onSubmit={login}
          className="w-full max-w-sm space-y-4 rounded-2xl bg-white p-6 shadow-lg"
        >
          <h1
            className="text-2xl font-bold text-sage-800"
            style={{ fontFamily: "Beiruti, sans-serif" }}
          >
            لوحة الإدارة
          </h1>
          <p className="text-sage-600">أدخلي كلمة مرور الإدارة للمتابعة.</p>
          <input
            type="password"
            value={passwordInput}
            onChange={(e) => setPasswordInput(e.target.value)}
            className={field}
            placeholder="كلمة المرور"
            autoFocus
          />
          {error && <p className="text-coral-600 text-lg">{error}</p>}
          <button
            type="submit"
            className="w-full rounded-xl bg-coral-500 py-3 font-semibold text-white"
          >
            دخول
          </button>
          <Link to="/" className="block text-center text-sage-600 underline">
            العودة للموقع
          </Link>
        </form>
      </div>
    );
  }

  return (
    <div
      className="min-h-svh px-4 py-8 sm:px-6"
      style={{ background: "linear-gradient(180deg, #FAF0EC 0%, #F4F6F3 100%)" }}
      dir="rtl"
    >
      <div className="mx-auto max-w-3xl space-y-8">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <h1
            className="text-3xl font-bold text-sage-800"
            style={{ fontFamily: "Beiruti, sans-serif" }}
          >
            إدارة النصائح
          </h1>
          <div className="flex gap-3 text-lg">
            <Link to="/blog" className="text-sage-600 underline">
              المدونة
            </Link>
            <button type="button" onClick={logout} className="text-coral-600 underline">
              خروج
            </button>
          </div>
        </header>

        {error && (
          <p className="rounded-xl bg-coral-50 px-4 py-3 text-coral-700">{error}</p>
        )}
        {message && (
          <p className="rounded-xl bg-sage-100 px-4 py-3 text-sage-700">{message}</p>
        )}

        <form onSubmit={save} className="space-y-3 rounded-2xl bg-white p-5 shadow-md">
          <h2 className="text-xl font-bold text-sage-800">
            {editingId ? "تعديل نصيحة" : "إضافة نصيحة"}
          </h2>

          <label className="block space-y-1">
            <span className="text-sage-700">العنوان *</span>
            <input
              className={field}
              value={form.tip}
              onChange={(e) => setForm({ ...form, tip: e.target.value })}
              required
            />
          </label>

          <div className="grid gap-3 sm:grid-cols-2">
            <label className="block space-y-1">
              <span className="text-sage-700">التاريخ</span>
              <input
                type="date"
                className={field}
                value={form.tip_date}
                onChange={(e) => setForm({ ...form, tip_date: e.target.value })}
                dir="ltr"
              />
            </label>
            <label className="block space-y-1">
              <span className="text-sage-700">التصنيف</span>
              <select
                className={field}
                value={form.tip_category}
                onChange={(e) =>
                  setForm({ ...form, tip_category: e.target.value })
                }
              >
                {BLOG_CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="block space-y-1">
            <span className="text-sage-700">الخطاف (hook)</span>
            <input
              className={field}
              value={form.hook}
              onChange={(e) => setForm({ ...form, hook: e.target.value })}
            />
          </label>

          <label className="block space-y-1">
            <span className="text-sage-700">المحتوى</span>
            <textarea
              className={`${field} min-h-32`}
              value={form.tip_description}
              onChange={(e) =>
                setForm({ ...form, tip_description: e.target.value })
              }
            />
          </label>

          <label className="block space-y-1">
            <span className="text-sage-700">رابط إنستغرام</span>
            <input
              className={field}
              value={form.instagram_url}
              onChange={(e) =>
                setForm({ ...form, instagram_url: e.target.value })
              }
              dir="ltr"
            />
          </label>

          <div className="flex flex-wrap gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="rounded-xl bg-coral-500 px-5 py-2.5 font-semibold text-white disabled:opacity-60"
            >
              {editingId ? "حفظ التعديل" : "إضافة"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="rounded-xl border border-sage-300 px-5 py-2.5 text-sage-700"
              >
                إلغاء
              </button>
            )}
          </div>
        </form>

        <section className="space-y-3">
          <h2 className="text-xl font-bold text-sage-800">
            النصائح ({tips.length})
          </h2>
          {loading && tips.length === 0 && (
            <p className="text-sage-600">جاري التحميل...</p>
          )}
          {tips.map((tip) => (
            <article
              key={tip._id}
              className="rounded-2xl border border-cream-300 bg-white p-4 shadow-sm"
            >
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-sage-800">
                    {tip.tip || "بدون عنوان"}
                  </h3>
                  <p className="text-sage-600">
                    {tip.tip_category || "—"}
                    {tip.tip_date ? ` · ${tip.tip_date}` : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => startEdit(tip)}
                    className="rounded-lg bg-sage-100 px-3 py-1.5 text-sage-800"
                  >
                    تعديل
                  </button>
                  <button
                    type="button"
                    onClick={() => void remove(tip._id)}
                    className="rounded-lg bg-coral-50 px-3 py-1.5 text-coral-700"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </article>
          ))}
        </section>
      </div>
    </div>
  );
}
