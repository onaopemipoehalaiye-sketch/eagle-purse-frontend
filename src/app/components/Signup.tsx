import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Eye, EyeOff } from "lucide-react";

export function Signup() {
  const navigate = useNavigate();
  const auth = useAuth();

  useEffect(() => {
    if (auth.token) {
      navigate("/dashboard", { replace: true });
    }
  }, [auth.token, navigate]);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const passwordsMatch = confirmPassword === "" || password === confirmPassword;
  const [monthlyAllowance, setMonthlyAllowance] = useState("30000");
  const [feedingBudget, setFeedingBudget] = useState("15000");
  const [allowancePeriod, setAllowancePeriod] = useState("monthly");
  const [dietaryPref, setDietaryPref] = useState("");
  const [mealsPerDay, setMealsPerDay] = useState(3);
  const [mealTimes, setMealTimes] = useState<string[]>(["breakfast", "lunch", "dinner"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleMealTimeToggle = (time: string) => {
    setMealTimes(prev => 
      prev.includes(time) ? prev.filter(t => t !== time) : [...prev, time]
    );
  };

  const handleMealsPerDayChange = (num: number) => {
    setMealsPerDay(num);
    if (num === 1) setMealTimes(["lunch"]);
    else if (num === 2) setMealTimes(["lunch", "dinner"]);
    else if (num === 3) setMealTimes(["breakfast", "lunch", "dinner"]);
    else if (num === 4) setMealTimes(["breakfast", "lunch", "dinner", "snack"]);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setError(null);
    setLoading(true);
    const success = await auth.signup({
      email,
      password,
      monthly_allowance: parseFloat(monthlyAllowance) || 0,
      feeding_budget: parseFloat(feedingBudget) || 0,
      allowance_period: allowancePeriod,
      dietary_pref: dietaryPref,
      meals_per_day: mealTimes.length,
      meal_times: mealTimes,
    });
    setLoading(false);
    if (success) {
      navigate("/dashboard");
    } else {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center px-4 py-8">
      <div className="w-full max-w-lg bg-card shadow-xl rounded-3xl p-6 border border-border animate-fadeIn">
        <h1 className="text-2xl font-semibold text-foreground mb-4">Create your EaglePurse account</h1>
        <p className="text-sm text-muted-foreground mb-6">Set your budget and get personalised coaching.</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <label className="block">
            <span className="text-sm text-muted-foreground">Email</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-200 dark:border-gray-600 px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              required
            />
          </label>

          <label className="block relative">
            <span className="text-sm text-muted-foreground">Password</span>
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-200 dark:border-gray-600 px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 pr-12"
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-4 top-10 text-gray-500"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </label>

          <label className="block">
            <span className="text-sm text-muted-foreground">Confirm Password</span>
            <div className="relative mt-2">
              <input
                type={showConfirm ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className={`w-full rounded-2xl border px-4 py-3 pr-12 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 transition-colors ${
                  passwordsMatch
                    ? "border-gray-200 dark:border-gray-600 focus:ring-[#0B6623]"
                    : "border-red-400 dark:border-red-500 focus:ring-red-400"
                }`}
                required
              />
              <button
                type="button"
                onClick={() => setShowConfirm(v => !v)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-200 transition-colors"
                tabIndex={-1}
                aria-label={showConfirm ? "Hide confirm password" : "Show confirm password"}
              >
                {showConfirm ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
            {!passwordsMatch && (
              <p className="mt-1 text-xs text-red-500 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Passwords do not match
              </p>
            )}
            {passwordsMatch && confirmPassword !== "" && (
              <p className="mt-1 text-xs text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
                Passwords match
              </p>
            )}
          </label>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <label className="block">
              <span className="text-sm text-muted-foreground">{allowancePeriod === 'weekly' ? 'Weekly' : allowancePeriod === 'bi-weekly' ? 'Bi-weekly' : 'Monthly'} allowance</span>
              <input
                type="number"
                value={monthlyAllowance}
                onChange={(e) => setMonthlyAllowance(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-gray-200 dark:border-gray-600 px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </label>

            <label className="block">
              <span className="text-sm text-muted-foreground">Feeding budget</span>
              <input
                type="number"
                value={feedingBudget}
                onChange={(e) => setFeedingBudget(e.target.value)}
                className="mt-2 w-full rounded-2xl border border-gray-200 dark:border-gray-600 px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
                required
              />
            </label>
          </div>

          <label className="block">
            <span className="text-sm text-muted-foreground">Allowance Period</span>
            <select
              value={allowancePeriod}
              onChange={(e) => setAllowancePeriod(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-200 dark:border-gray-600 px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0B6623]"
            >
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Bi-weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </label>

          <label className="block">
            <span className="text-sm text-muted-foreground">Dietary preference</span>
            <input
              type="text"
              value={dietaryPref}
              onChange={(e) => setDietaryPref(e.target.value)}
              className="mt-2 w-full rounded-2xl border border-gray-200 dark:border-gray-600 px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
            />
          </label>

          <label className="block">
            <span className="text-sm text-muted-foreground">How many meals per day? (Preset)</span>
            <select
              value={mealsPerDay}
              onChange={(e) => handleMealsPerDayChange(Number(e.target.value))}
              className="mt-2 w-full rounded-2xl border border-gray-200 dark:border-gray-600 px-4 py-3 bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#0B6623]"
            >
              <option value={1}>1 Meal</option>
              <option value={2}>2 Meals</option>
              <option value={3}>3 Meals</option>
              <option value={4}>4 Meals</option>
            </select>
          </label>

          <div className="block">
            <span className="text-sm text-muted-foreground block mb-2">Meal Times</span>
            <div className="flex flex-wrap gap-3">
              {["breakfast", "lunch", "dinner", "snack"].map(time => (
                <label key={time} className="flex items-center gap-2 cursor-pointer bg-white dark:bg-gray-700 px-3 py-2 rounded-xl border border-gray-200 dark:border-gray-600">
                  <input
                    type="checkbox"
                    checked={mealTimes.includes(time)}
                    onChange={() => handleMealTimeToggle(time)}
                    className="w-4 h-4 text-[#0B6623] rounded focus:ring-[#0B6623]"
                  />
                  <span className="text-sm text-gray-900 dark:text-gray-100 capitalize">{time}</span>
                </label>
              ))}
            </div>
          </div>

          {error && <div className="text-sm text-destructive">{error}</div>}

          <button
            type="submit"
            disabled={loading || !passwordsMatch || confirmPassword === ""}
            className="w-full rounded-2xl bg-[#0B6623] px-4 py-3 text-white hover:bg-[#0B6623]/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating account..." : "Create account"}
          </button>
        </form>

        <p className="text-sm text-muted-foreground mt-6 text-center">
          Already have an account? <Link to="/login" className="font-semibold text-[#0B6623] dark:text-emerald-400">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
