<template>
  <article class="rounded-md bg-white overflow-hidden shadow-lg">
    <slot name="header">
    </slot>
    <hr v-if="$slots.header && ($slots.default || $slots.footer)" />
    <slot>
    </slot>
    <hr v-if="$slots.footer && ($slots.header || $slots.default)" />
    <slot name="footer">
    </slot>
  </article>
</template>
