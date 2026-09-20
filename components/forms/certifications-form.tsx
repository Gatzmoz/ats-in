"use client";

import React from "react";
import { useResumeStore } from "@/lib/zustand";
import FormInput from "@/components/forms/form-input";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Award, Plus, Trash2 } from "lucide-react";

export default function CertificationsForm() {
  const certifications = useResumeStore((state) => state.data.certifications);
  const addCertification = useResumeStore((state) => state.addCertification);
  const updateCertification = useResumeStore((state) => state.updateCertification);
  const removeCertification = useResumeStore((state) => state.removeCertification);

  return (
    <div className="space-y-4">
      <div className="border-b pb-2 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            Certifications & Licenses
          </h2>
          <p className="text-xs text-slate-500">
            Include relevant professional credentials, courses, and certifications.
          </p>
        </div>
        <Button
          size="sm"
          onClick={() => addCertification()}
          className="bg-blue-600 hover:bg-blue-700 text-white gap-1 text-xs"
        >
          <Plus className="w-4 h-4" /> Add Certification
        </Button>
      </div>

      {certifications.length === 0 ? (
        <div className="p-8 text-center border-2 border-dashed rounded-lg text-slate-400">
          <p className="text-sm">No certifications added yet.</p>
          <Button
            variant="outline"
            size="sm"
            onClick={() => addCertification()}
            className="mt-3 text-xs gap-1"
          >
            <Plus className="w-3.5 h-3.5" /> Add Certification
          </Button>
        </div>
      ) : (
        <div className="space-y-3">
          {certifications.map((cert, index) => (
            <Card key={cert.id} className="p-4 relative border-slate-200 dark:border-slate-800">
              <div className="flex items-center justify-between mb-2 border-b pb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600">
                  Certification #{index + 1}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeCertification(cert.id)}
                  className="h-7 w-7 p-0 text-slate-400 hover:text-rose-600"
                  title="Remove Certification"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <FormInput
                  label="Certification Name"
                  value={cert.name || ""}
                  onChange={(e) =>
                    updateCertification(cert.id, { name: e.target.value })
                  }
                  placeholder="e.g. AWS Certified Solutions Architect"
                />

                <FormInput
                  label="Issuing Organization"
                  value={cert.issuer || ""}
                  onChange={(e) =>
                    updateCertification(cert.id, { issuer: e.target.value })
                  }
                  placeholder="e.g. Amazon Web Services"
                />

                <div className="grid grid-cols-2 gap-2">
                  <FormInput
                    label="Issue Date"
                    type="month"
                    value={cert.issueDate || ""}
                    onChange={(e) =>
                      updateCertification(cert.id, { issueDate: e.target.value })
                    }
                  />

                  <FormInput
                    label="Expiration Date (Optional)"
                    type="month"
                    value={cert.expirationDate || ""}
                    onChange={(e) =>
                      updateCertification(cert.id, {
                        expirationDate: e.target.value,
                      })
                    }
                  />
                </div>

                <FormInput
                  label="Credential Verification URL"
                  type="url"
                  value={cert.credentialUrl || ""}
                  onChange={(e) =>
                    updateCertification(cert.id, {
                      credentialUrl: e.target.value,
                    })
                  }
                  placeholder="e.g. https://aws.amazon.com/verify/..."
                />
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
