import { computed, ref, unref, Ref, isRef, isReactive } from 'vue'

import { isEqual, cloneDeep } from 'lodash'

type MaybeRef<T> = T | Ref<T>

export function useClone<T>(initValue: MaybeRef<T>) {
    const _isRef = isRef(initValue)
    const _isReactive = isReactive(initValue)
    const base = ref(_isRef ? null : _isReactive ? null : cloneDeep(unref(initValue))) as {
        value: T
    }
    const clone = ref(cloneDeep(unref(initValue)) as T)

    const hasChanged = computed(() =>
        _isRef
            ? !isEqual(initValue.value, clone.value)
            : _isReactive
              ? !isEqual(initValue, clone.value)
              : !isEqual(base.value, clone.value)
    )

    function setBase(value: MaybeRef<T>) {
        base.value = cloneDeep(unref(value)) as T
    }

    return {
        clone,
        hasChanged,

        setBase,
    }
}
