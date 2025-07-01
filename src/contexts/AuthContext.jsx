import React, { createContext, useContext, useState, useEffect } from "react";
import supabase from "../lib/supabase";
import PropTypes from "prop-types";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Get initial session
    const fetchSession = async () => {
      try {
        const { data, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (data.session) {
          setSession(data.session);
          setUser(data.session.user);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchSession();

    // Set up auth state listener
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session) {
        setSession(session);
        setUser(session.user);
      } else {
        setSession(null);
        setUser(null);
      }
      setLoading(false);
    });

    // Clean up subscription when component unmounts
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signIn = async (email, password) => {
    try {
      setError(null);
      const { data, error: signInError } =
        await supabase.auth.signInWithPassword({
          email,
          password,
        });
      if (signInError) throw signInError;
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  const signInAnonymously = async () => {
    try {
      setError(null);
      const { data, error: signInError } =
        await supabase.auth.signInAnonymously();
      if (signInError) throw signInError;
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };
  const signOut = async () => {
    try {
      setError(null);
      const { error: signOutError } = await supabase.auth.signOut();
      if (signOutError) throw signOutError;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const register = async (email, password) => {
    try {
      setError(null);
      const { data, error: registerError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`,
        },
      });
      if (registerError) throw registerError;
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const requestPasswordResetEmail = async (email) => {
    try {
      console.log("Requesting password reset for:", email);
      setError(null);
      const { error: resetError } = await supabase.auth.resetPasswordForEmail(
        email,
        {
          redirectTo: `${window.location.origin}/auth/reset-password`,
        },
      );
      if (resetError) throw resetError;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const updatePassword = async (newPassword) => {
    try {
      setError(null);
      const { error: updateError } = await supabase.auth.updateUser({
        password: newPassword,
      });
      if (updateError) throw updateError;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const refreshSession = async () => {
    try {
      setError(null);
      const { data, error: refreshError } =
        await supabase.auth.refreshSession();
      if (refreshError) throw refreshError;
      if (data.session) {
        setSession(data.session);
        setUser(data.session.user);
      }
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  };

  const value = {
    session,
    user,
    loading,
    error,
    signIn,
    signInAnonymously,
    signOut,
    register,
    requestPasswordResetEmail,
    updatePassword,
    refreshSession,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
