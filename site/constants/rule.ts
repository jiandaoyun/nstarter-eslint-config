export type RuleNamespaces = 'node' | 'typescript';

export const RuleNamespaceExtensionMap = {
    node: 'js',
    typescript: 'ts'
};

export const RuleNamespacePrismLanguageMap = {
    node: 'js',
    typescript: 'ts'
};

export interface Rule {
    name: string;
    value: any;
    description: string;
    reason?: string;
    comments: string;
    badExample?: string;
    goodExample?: string;
    [key: string]: string | boolean | undefined;
}
