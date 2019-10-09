export type RuleNamespaces = 'index' | 'typescript';

export const RuleNamespaceExtensionMap = {
    index: 'js',
    typescript: 'ts'
};

export const RuleNamespacePrismLanguageMap = {
    index: 'js',
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
