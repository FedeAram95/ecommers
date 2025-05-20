<template>
    <section class="section">
        <div class="header">
            <h2 v-if="title">{{ title }}</h2>
            <p v-if="subtitle" class="subtitle">{{ subtitle }}</p>
        </div>
        <div class="path-container">
            <div class="common-path">
                <div v-for="(step, index) in commonSteps" :key="'common-' + index" 
                    class="step" 
                    @click="handleStepClick(step)"
                    :class="{ 'clickable': step.route }"
                >
                    <div class="step-content">
                        <div class="step-number">{{ index + 1 }}</div>
                        <h3>{{ step.title }}</h3>
                        <p>{{ step.description }}</p>
                    </div>
                </div>
            </div>
            <div class="branch-point" v-if="hasBranches">
                <div class="branch-icon">↓</div>
                <div class="branch-arrow"></div>
            </div>
            <div class="branches" v-if="hasBranches">
                <div class="branch" v-for="(branch, branchIndex) in branches" :key="'branch-' + branchIndex">
                    <h3 class="branch-title">{{ branch.title }}</h3>
                    <div class="branch-steps">
                        <div v-for="(step, stepIndex) in branch.steps" 
                            :key="'step-' + stepIndex" 
                            class="step"
                            @click="handleStepClick(step)"
                            :class="{ 'clickable': step.route }"
                        >
                            <div class="step-content">
                                <div class="step-number">{{ commonSteps.length + stepIndex + 1 }}</div>
                                <h4>{{ step.title }}</h4>
                                <p>{{ step.description }}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()

const props = defineProps({
    title: { type: String, default: '' },
    subtitle: { type: String, default: '' },
    commonSteps: { 
        type: Array, 
        default: () => [] 
    },
    branches: { 
        type: Array, 
        default: () => [] 
    },
    hasBranches: { 
        type: Boolean, 
        default: true 
    }
})

const handleStepClick = (step) => {
    if (step.route) {
        router.push(step.route)
    }
}
</script>

<style scoped lang="scss">
.section {
    border-radius: 20px;
    padding: 3rem;
    margin: 4rem auto;
    max-width: 65%;
    background: #1e1e2f;
    box-shadow: 0 4px 20px rgba(0, 130, 190, 0.2);
}

.header {
    text-align: center;
    margin-bottom: 3rem;

    h2 {
        font-size: 2.2rem;
        color: #fff;
        font-weight: 700;
        margin-bottom: 2rem;
        letter-spacing: -0.5px;
        text-shadow: 0 2px 4px rgba(0, 0, 0, 0.5);
    }

    .subtitle {
        font-size: 1.1rem;
        color: #d1d1d1;
        max-width: 800px;
        margin: 0 auto;
        line-height: 1.6;
    }
}

.path-container {
    position: relative;
    padding: 1rem 0;
}

.common-path {
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
    // padding-bottom: 1rem;
    // margin-bottom: 2rem;

    &::after {
        content: '';
        position: absolute;
        left: 50%;
        top: 40px;
        bottom: 0;
        width: 3px;
        background: linear-gradient(180deg, #0082BE, #00B4D8);
        transform: translateX(-50%);
    }
}

.step {
    position: relative;
    z-index: 2;
    width: 100%;
    max-width: 600px;
    margin: 1rem 0;
    transition: all 0.3s ease;

    .step-content {
        background: #2a2a3c;
        padding: 1rem;
        border-radius: 16px;
        border: 2px solid #363646;
        transition: all 0.3s ease;
        cursor: pointer;

        &:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 24px rgba(0, 130, 190, 0.3);
            border-color: #0082BE;
            background: #2f2f42;
        }

        .step-number {
            width: 40px;
            height: 40px;
            background: #0082BE;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 1.2rem;
            font-weight: 600;
            color: #fff;
            margin: 0 auto 1.2rem;
        }

        h3, h4 {
            color: #fff;
            margin: 0 0 1rem 0;
            font-size: 1.3rem;
            text-align: center;
            font-weight: 600;
        }

        p {
            color: #a0a0b0;
            margin: 0;
            line-height: 1.6;
            text-align: center;
            font-size: 1rem;
        }
    }
}

.branch-point {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 2rem 0;
    position: relative;

    .branch-icon {
        font-size: 2rem;
        color: #0082BE;
        background: #2a2a3c;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0, 130, 190, 0.2);
        z-index: 2;
    }

    .branch-arrow {
        position: absolute;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
        width: 2px;
        height: 40px;
        background: linear-gradient(180deg, #0082BE, transparent);
    }
}

.branches {
    display: flex;
    gap: 2rem;
    padding-top: 2rem;

    .branch {
        flex: 1;
        background: #2a2a3c;
        border-radius: 16px;
        padding: 2.5rem;
        border: 2px solid #363646;

        .branch-title {
            color: #fff;
            margin-bottom: 2.5rem;
            text-align: center;
            font-size: 1.5rem;
            font-weight: 700;
            letter-spacing: -0.5px;
        }

        .branch-steps {
            display: flex;
            flex-direction: column;
            gap: 1.5rem;

            .step {
                margin: 0;
            }
        }
    }
}

@media (max-width: 768px) {
    .section {
        padding: 2rem;
    }

    .common-path {
        flex-direction: column;
        align-items: center;

        &::after {
            width: 3px;
            height: 100%;
            left: 50%;
            top: 0;
            right: auto;
            background: linear-gradient(180deg, #0082BE, #00B4D8);
        }
    }

    .step {
        margin: 1rem 0;
        width: 100%;
        max-width: 400px;
    }

    .branches {
        flex-direction: column;
    }
}
</style> 