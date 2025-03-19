"use client"

import { Badge } from "@/components/ui/badge"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export function SecuritySettings() {
  const [settings, setSettings] = useState({
    twoFactorAuth: true,
    ipWhitelisting: false,
    transactionLimits: true,
    autoLockout: true,
    suspiciousActivityAlerts: true,
    apiAccessControl: false,
  })

  const handleToggle = (setting: string) => {
    setSettings({
      ...settings,
      [setting]: !settings[setting as keyof typeof settings],
    })
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Security Settings</CardTitle>
        <CardDescription>Configure platform security and access controls</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="general">
          <TabsList className="mb-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="authentication">Authentication</TabsTrigger>
            <TabsTrigger value="transactions">Transactions</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="suspicious-activity">Suspicious Activity Alerts</Label>
                <p className="text-sm text-muted-foreground">
                  Receive alerts for suspicious login attempts and transactions
                </p>
              </div>
              <Switch
                id="suspicious-activity"
                checked={settings.suspiciousActivityAlerts}
                onCheckedChange={() => handleToggle("suspiciousActivityAlerts")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="auto-lockout">Automatic Account Lockout</Label>
                <p className="text-sm text-muted-foreground">
                  Automatically lock accounts after multiple failed login attempts
                </p>
              </div>
              <Switch
                id="auto-lockout"
                checked={settings.autoLockout}
                onCheckedChange={() => handleToggle("autoLockout")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="api-access">API Access Control</Label>
                <p className="text-sm text-muted-foreground">
                  Restrict API access to specific IP addresses and applications
                </p>
              </div>
              <Switch
                id="api-access"
                checked={settings.apiAccessControl}
                onCheckedChange={() => handleToggle("apiAccessControl")}
              />
            </div>
          </TabsContent>
          <TabsContent value="authentication" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="two-factor">Two-Factor Authentication</Label>
                <p className="text-sm text-muted-foreground">Require 2FA for all admin and user accounts</p>
              </div>
              <Switch
                id="two-factor"
                checked={settings.twoFactorAuth}
                onCheckedChange={() => handleToggle("twoFactorAuth")}
              />
            </div>
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="ip-whitelist">IP Whitelisting</Label>
                <p className="text-sm text-muted-foreground">Restrict admin access to specific IP addresses</p>
              </div>
              <Switch
                id="ip-whitelist"
                checked={settings.ipWhitelisting}
                onCheckedChange={() => handleToggle("ipWhitelisting")}
              />
            </div>
            {settings.ipWhitelisting && (
              <div className="pt-2">
                <Label htmlFor="ip-addresses">Allowed IP Addresses</Label>
                <div className="flex mt-1.5 gap-2">
                  <Input id="ip-addresses" placeholder="e.g., 192.168.1.1, 10.0.0.1" />
                  <Button>Add</Button>
                </div>
              </div>
            )}
          </TabsContent>
          <TabsContent value="transactions" className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label htmlFor="transaction-limits">Transaction Limits</Label>
                <p className="text-sm text-muted-foreground">Set maximum transaction amounts and frequency limits</p>
              </div>
              <Switch
                id="transaction-limits"
                checked={settings.transactionLimits}
                onCheckedChange={() => handleToggle("transactionLimits")}
              />
            </div>
            {settings.transactionLimits && (
              <div className="space-y-4 pt-2">
                <div>
                  <Label htmlFor="max-amount">Maximum Transaction Amount (USDT)</Label>
                  <Input id="max-amount" type="number" defaultValue="10000" className="mt-1.5" />
                </div>
                <div>
                  <Label htmlFor="daily-limit">Daily Transaction Limit (USDT)</Label>
                  <Input id="daily-limit" type="number" defaultValue="50000" className="mt-1.5" />
                </div>
              </div>
            )}
            <div className="pt-2">
              <Label>High-Risk Countries</Label>
              <p className="text-sm text-muted-foreground mb-2">
                Additional verification for transactions from high-risk regions
              </p>
              <div className="flex flex-wrap gap-2">
                <Badge variant="outline" className="px-2 py-1">
                  North Korea
                </Badge>
                <Badge variant="outline" className="px-2 py-1">
                  Iran
                </Badge>
                <Badge variant="outline" className="px-2 py-1">
                  Syria
                </Badge>
                <Badge variant="outline" className="px-2 py-1">
                  Cuba
                </Badge>
                <Badge variant="outline" className="px-2 py-1 flex items-center gap-1">
                  Add Country
                  <span className="text-xs">+</span>
                </Badge>
              </div>
            </div>
          </TabsContent>
        </Tabs>
        <div className="flex justify-end mt-6">
          <Button>Save Settings</Button>
        </div>
      </CardContent>
    </Card>
  )
}

